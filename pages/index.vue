<script setup lang="ts">
import {
  MediaFormat,
  MediaSeason,
  type MediaBySeasonQuery,
} from "#gql/default";
import fallIcon from "@/assets/svg/fall-icon.svg";
import springIcon from "@/assets/svg/spring-icon.svg";
import summerIcon from "@/assets/svg/summer-icon.svg";
import winterIcon from "@/assets/svg/winter-icon.svg";
import { APP_CONFIGS } from "~/constants";
import { All, type Format, type Status } from "~/types/Enums";

const router = useRouter(); // Get the router instance
const route = useRoute(); // Get the current route

enum SelectedStatus {
  ALL,
  AIRING,
  FINISHED,
  SOON,
}

const currentDate = new Date();
let mediaBySeasonData = ref<MediaBySeasonQuery | null>();
let loading: Ref<boolean> = ref(true);
let error = ref<null | Error>(null);
let currentYear: Ref<number> = ref(currentDate.getFullYear());
let formatSelected: Ref<Format> = ref(All.ALL);
let statusSelected: Ref<Status> = ref(All.ALL);
let seasonSelected: Ref<MediaSeason> = ref(
  (route.query.season as MediaSeason) || getCurrentSeason()
);
const toggleFilter: Ref<boolean> = ref(false);
const toggleSearch: Ref<boolean> = ref(false);
const searchText: Ref<string> = ref("");
const { locale } = useI18n();

function formatSelectedCallback(format: Format) {
  formatSelected.value = format;
}

function statusSelectedCallback(status: Status) {
  statusSelected.value = status;
}

// Function to update the query parameter
function updatePageQuery(season: MediaSeason) {
  router.push({
    path: route.path, // Keep the current path
    query: { ...route.query, season }, // Update the query with the new season
  });
}

function handleSeasonChange(season: MediaSeason, year: number) {
  getInitialSeason(season, year).then(() => {
    translateDescriptions();
  });
}

function getSeasonIcon(season: MediaSeason): string {
  switch (season) {
    case MediaSeason.FALL:
      return fallIcon;
    case MediaSeason.SPRING:
      return springIcon;
    case MediaSeason.SUMMER:
      return summerIcon;
    case MediaSeason.WINTER:
      return winterIcon;
  }
}

async function getInitialSeason(season: MediaSeason, year: number) {
  loading.value = true;
  const SEASONS: MediaSeason[] = [
    MediaSeason.WINTER,
    MediaSeason.SPRING,
    MediaSeason.SUMMER,
    MediaSeason.FALL,
  ];
  const currentSeasonIndex = SEASONS.findIndex((s) => s === season);
  const previousSeasonIndex =
    currentSeasonIndex - 1 < 0 ? SEASONS.length - 1 : currentSeasonIndex - 1;
  const previousSeason: MediaSeason = SEASONS[previousSeasonIndex];
  try {
    const queryData = await GqlMediaBySeason({
      season,
      previousSeason,
      year,
    });
    mediaBySeasonData.value = queryData;
    currentYear.value = year;
    seasonSelected.value = season;

    updatePageQuery(season);
  } catch (e) {
    error.value = e as Error;
  } finally {
    loading.value = false;
  }
}

async function translateDescriptions() {
  if (locale.value === "en-us") return;
  if (!mediaBySeasonData.value) return;

  for (const key in mediaBySeasonData.value) {
    const season =
      mediaBySeasonData.value[key as keyof typeof mediaBySeasonData.value];

    if (season?.media) {
      for (let i = 0; i < season.media.length; i++) {
        const m = season.media[i];

        // Check if the media item has an ID and description to translate
        if (m?.id && m?.description) {
          try {
            // Wait for the translation to finish
            const result = await translate(m?.id, m?.description, locale.value);
            // Immediately update the description after translation
            mediaBySeasonData!.value[
              key as keyof typeof mediaBySeasonData.value
            ]!.media![i] = {
              ...m,
              description:
                result?.data[locale.value] ||
                result?.data["en-US"] ||
                m?.description,
            };

            // You could also trigger a manual reactivity update here if needed, though Nuxt's reactivity should automatically update the UI.
          } catch (error) {
            console.error(`Error translating media ${m?.id}:`, error);
          }
        }
      }
    }
  }
}

await getInitialSeason(seasonSelected.value, currentYear.value).then(() => {
  translateDescriptions();
  const head = constructHead({
    ogUrl: process.env.NUXT_PUBLIC_SITE_URL || APP_CONFIGS.cannonicalUrl,
    description: APP_CONFIGS.description,
    ogImage:
      (mediaBySeasonData?.value?.TV?.media?.at(0)?.bannerImage as string) ||
      (mediaBySeasonData?.value?.TV?.media?.at(0)?.coverImage as string),
    title: APP_CONFIGS.title,
  });
  useHead({
    title: head.title,
    meta: head.meta,
    link: head.link,
    htmlAttrs: head.htmlAttrs,
  });
  defineOgImage({
    url:
      mediaBySeasonData?.value?.TV?.media?.at(0)?.bannerImage ||
      mediaBySeasonData?.value?.TV?.media?.at(0)?.coverImage?.extraLarge ||
      "",
  });
});
</script>

<style scoped></style>

<template>
  <div>
    <home-banner :season="seasonSelected" :year="currentYear" id="caroussel" />
    <div id="content">
      <h1
        class="mt-6 text-center text-neutral-50 text-[40px] sm:text-6xl font-medium leading-[60px]"
      >
        {{ $t("home.body.title") }}
      </h1>

      <h3
        class="mt-4 text-center text-neutral-50 text-[16px] sm:text-[22px] font-normal leading-[34px] xl:px-8"
      >
        {{ $t("home.body.subtitle") }}
      </h3>

      <div
        class="w-full h-[140px] sm:h-[60px] my-8 flex flex-row gap-4 justify-center text-white"
      >
        <season-button
          v-for="(seasonInfo, index) in getYearBySeason()"
          :key="index"
          :selected="seasonInfo.seasonEnum === seasonSelected"
          :label="`${$t(seasonInfo.seasonEnum.toLowerCase())} ${
            seasonInfo.seasonYear
          }`"
          :icon="getSeasonIcon(seasonInfo.seasonEnum)"
          :on-click="
            () =>
              handleSeasonChange(seasonInfo.seasonEnum, seasonInfo.seasonYear)
          "
        />
      </div>

      <anime-filter
        class="mx-4 2xl:mx-80"
        :hint="$t('search.placeholder')"
        :error-message="$t('search.error')"
        :selected-format="formatSelected"
        :selected-status="statusSelected"
        :onSubmit="
          (isValid, text) => {
            if (isValid) {
              navigateTo(constructLocalePath('/search', null, text));
            }
          }
        "
        :validation="
          (value) => {
            return value.length !== 0 && value.length >= 3;
          }
        "
        :onFormatSelected="formatSelectedCallback"
        :onStatusSelected="statusSelectedCallback"
      />

      <ad-container />

      <custom-grid
        v-if="
          mediaBySeasonData?.TV?.media?.length &&
          (formatSelected === All.ALL || formatSelected === MediaFormat.TV)
        "
      >
        <anime-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :studio-id="anime?.studios?.nodes?.at(0)?.id ?? 0"
          :studio="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :average-score="anime?.averageScore ?? 0"
          :type="anime?.format ?? '-'"
          :synopsis="anime?.description ?? '-'"
          v-for="anime in mediaBySeasonData?.TV?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <custom-grid
        v-if="
          mediaBySeasonData?.MOVIES?.media?.length &&
          (formatSelected === All.ALL || formatSelected === MediaFormat.MOVIE)
        "
      >
        <anime-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :studio-id="anime?.studios?.nodes?.at(0)?.id ?? 0"
          :studio="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :average-score="anime?.averageScore ?? 0"
          :type="anime?.format ?? '-'"
          :synopsis="anime?.description ?? '-'"
          v-for="anime in mediaBySeasonData?.MOVIES?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <custom-grid
        v-if="
          mediaBySeasonData?.SHORTS?.media?.length &&
          (formatSelected === All.ALL ||
            formatSelected === MediaFormat.TV_SHORT)
        "
      >
        <anime-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :studio-id="anime?.studios?.nodes?.at(0)?.id ?? 0"
          :studio="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :average-score="anime?.averageScore ?? 0"
          type="SHORTS"
          :synopsis="anime?.description ?? '-'"
          v-for="anime in mediaBySeasonData?.SHORTS?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <custom-grid
        v-if="
          mediaBySeasonData?.SPECIALS?.media?.length &&
          (formatSelected === All.ALL || formatSelected === MediaFormat.SPECIAL)
        "
      >
        <anime-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :studio-id="anime?.studios?.nodes?.at(0)?.id ?? 0"
          :studio="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :average-score="anime?.averageScore ?? 0"
          :type="anime?.format ?? '-'"
          :synopsis="anime?.description ?? '-'"
          v-for="anime in mediaBySeasonData?.SPECIALS?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <custom-grid
        v-if="
          mediaBySeasonData?.LEFTOVERS?.media?.length &&
          (formatSelected === All.ALL || formatSelected === All.OTHER)
        "
      >
        <anime-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :studio-id="anime?.studios?.nodes?.at(0)?.id ?? 0"
          :studio="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :average-score="anime?.averageScore ?? 0"
          :type="anime?.format ?? '-'"
          :synopsis="anime?.description ?? '-'"
          v-for="anime in mediaBySeasonData?.LEFTOVERS?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <div :v-if="mediaBySeasonData?.TV?.media?.length === 0">
        {{ $t("home.body.nothing-found") }}
      </div>
    </div>
  </div>
</template>

