<script setup lang="ts">
import { MediaSeason, type MediaBySeasonQuery } from "#gql/default";
import fallIcon from "@/assets/svg/fall-icon.svg";
import springIcon from "@/assets/svg/spring-icon.svg";
import summerIcon from "@/assets/svg/summer-icon.svg";
import winterIcon from "@/assets/svg/winter-icon.svg";
import { APP_CONFIGS } from "~/constants";
// import { useTranslationStore } from "~/stores/translationStore";
// import { useDeepLTranslationService } from "~/services/deeplTranslationService";

const router = useRouter(); // Get the router instance
const route = useRoute(); // Get the current route

// const { translateMediasDescription } = useTranslationHelper();
// const { translateBatch } = useDeepLTranslationService();
// const translationStore = useTranslationStore();

const currentDate = new Date();
let mediaBySeasonData = ref<MediaBySeasonQuery | null>();
let loading: Ref<boolean> = ref(true);
let error = ref<null | Error>(null);
let currentYear: Ref<number> = ref(currentDate.getFullYear());
let seasonSelected: Ref<MediaSeason> = ref(
  (route.query.season as MediaSeason) || getCurrentSeason()
);
const toggleFilter: Ref<boolean> = ref(false);
const toggleSearch: Ref<boolean> = ref(false);
const searchText: Ref<string> = ref("");
// let mediasDescription = ref<TranslationMap>();

// Function to update the query parameter
function updatePageQuery(season: MediaSeason) {
  router.push({
    path: route.path, // Keep the current path
    query: { ...route.query, season }, // Update the query with the new season
  });
}

function handleSeasonChange(season: MediaSeason, year: number) {
  getInitialSeason(season, year);
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

// function aglutinateValues(): TranslationMap {
//   return {
//     TV: mediaBySeasonData.value!.TV!.media!.map((m) => {
//       return { [m?.id ?? 0]: m?.description ?? "" };
//     }),
//     SHORTS: mediaBySeasonData.value!.SHORTS!.media!.map((m) => {
//       return { [m?.id ?? 0]: m?.description ?? "" };
//     }),
//     MOVIES: mediaBySeasonData.value!.MOVIES!.media!.map((m) => {
//       return { [m?.id ?? 0]: m?.description ?? "" };
//     }),
//     SPECIALS: mediaBySeasonData.value!.SPECIALS!.media!.map((m) => {
//       return { [m?.id ?? 0]: m?.description ?? "" };
//     }),
//     LEFTOVERS: mediaBySeasonData.value!.LEFTOVERS!.media!.map((m) => {
//       return { [m?.id ?? 0]: m?.description ?? "" };
//     }),
//   };
// }

// async function storeInPinia() {
//   translationStore.merge(mediasDescription.value!);
//   // translationStore.mergeTranslation(HomeMedias.TV, mediasDescription.value!.TV);
//   // const tvTranslations = translationStore.getTranslation(HomeMedias.TV);
//   console.log("tvTranslations", translationStore.getAll());
// }

async function getInitialSeason(season: MediaSeason, year: number) {
  loading.value = true;
  const seasons: MediaSeason[] = [
    MediaSeason.WINTER,
    MediaSeason.SPRING,
    MediaSeason.SUMMER,
    MediaSeason.FALL,
  ];
  const currentSeasonIndex = seasons.findIndex((s) => s === season);
  const previousSeasonIndex =
    currentSeasonIndex - 1 < 0 ? seasons.length - 1 : currentSeasonIndex - 1;
  const previousSeason: MediaSeason = seasons[previousSeasonIndex];
  try {
    const queryData = await GqlMediaBySeason({
      season,
      previousSeason,
      year,
    });
    mediaBySeasonData.value = queryData;
    currentYear.value = year;
    seasonSelected.value = season;
    // mediasDescription.value = aglutinateValues();
    updatePageQuery(season);
  } catch (e) {
    error.value = e as Error;
  } finally {
    loading.value = false;
  }
}

useSeoMeta({
  title: APP_CONFIGS.title,
  ogTitle: APP_CONFIGS.title,
  description: APP_CONFIGS.description,
  ogDescription: APP_CONFIGS.description,
  ogUrl: process.env.NUXT_PUBLIC_SITE_URL,
});

// async function translateDescriptions() {
//   mediasDescription.value = await translateMediasDescription(
//     mediasDescription.value!
//   );
//   storeInPinia();
// }

// onMounted(async () => {
// mediasDescription.value = translationStore.getAll();
// translateDescriptions();
// });
await getInitialSeason(seasonSelected.value, currentYear.value);
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
        class="mt-4 text-center text-neutral-50 text-[16px] sm:text-[22px] font-normal leading-[34px]"
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

      <ad-container />

      <div
        class="flex flex-row justify-start px-1 md:px-[340px] mb-4 h-16 items-center"
      >
        <!-- <img
          id="filter"
          src="@/assets/svg/filter-icon.svg"
          alt="Filter Icon"
          class="text-white w-6 h-6 cursor-pointer mr-6"
          @click="toggleFilter = !toggleFilter"
        /> -->
        <img
          id="search"
          src="@/assets/svg/search-icon.svg"
          alt="Filter Icon"
          class="text-white w-6 h-6 cursor-pointer mr-6"
          @click="toggleSearch = !toggleSearch"
        />
        <search-input
          v-if="toggleSearch"
          type="search"
          input-id="search"
          :hint="$t('search')"
          error-message="Este campo não pode estar vazio"
          :onSubmit="
            (isValid, text) => {
              if (isValid) {
                navigateTo(constructLocalePath('/search', null, text));
              }
              console.log('isValid', isValid, 'text', text);
            }
          "
          :validation="
            (value) => {
              return value.length !== 0 && value.length >= 3;
            }
          "
        ></search-input>
      </div>

      <div
        id="tv"
        v-if="mediaBySeasonData?.TV?.media?.length"
        class="text-white text-2xl font-semibold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-2"
      >
        {{ $t("home.body.tv") }}
      </div>

      <custom-grid v-if="mediaBySeasonData?.TV?.media?.length">
        <season-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :description="anime?.description ?? '-'"
          :next-episode="anime?.nextAiringEpisode?.episode"
          :episode-airing-at="anime?.nextAiringEpisode?.airingAt"
          :episodes="anime?.episodes"
          :studio-name="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :genres="anime?.genres"
          v-for="anime in mediaBySeasonData?.TV?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <ad-container />

      <div
        id="tv-shorts"
        class="text-white text-2xl font-semibold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-2 mt-4"
        v-if="mediaBySeasonData?.SHORTS?.media?.length"
      >
        {{ $t("home.body.tv-shorts") }}
      </div>
      <custom-grid v-if="mediaBySeasonData?.SHORTS?.media?.length">
        <season-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :description="anime?.description ?? '-'"
          :next-episode="anime?.nextAiringEpisode?.episode"
          :episode-airing-at="anime?.nextAiringEpisode?.airingAt"
          :episodes="anime?.episodes"
          :studio-name="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :genres="anime?.genres"
          v-for="anime in mediaBySeasonData?.SHORTS?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <ad-container v-if="mediaBySeasonData?.SHORTS?.media?.length" />

      <div
        id="movies"
        class="text-white text-2xl font-semibold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-2 mt-4"
        v-if="mediaBySeasonData?.MOVIES?.media?.length"
      >
        {{ $t("home.body.movies") }}
      </div>
      <custom-grid v-if="mediaBySeasonData?.MOVIES?.media?.length">
        <season-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :description="anime?.description ?? '-'"
          :next-episode="anime?.nextAiringEpisode?.episode"
          :episode-airing-at="anime?.nextAiringEpisode?.airingAt"
          :episodes="anime?.episodes"
          :studio-name="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :genres="anime?.genres"
          v-for="anime in mediaBySeasonData?.MOVIES?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <div
        id="left-overs"
        v-if="
          mediaBySeasonData?.LEFTOVERS?.media?.length &&
          seasonSelected === getCurrentSeason()
        "
        class="text-white text-2xl font-semibold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-2 mt-4"
      >
        {{ $t("home.body.in-progress") }}
      </div>
      <custom-grid
        v-if="
          mediaBySeasonData?.LEFTOVERS?.media?.length &&
          seasonSelected === getCurrentSeason()
        "
      >
        <season-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :description="anime?.description ?? '-'"
          :next-episode="anime?.nextAiringEpisode?.episode"
          :episode-airing-at="anime?.nextAiringEpisode?.airingAt"
          :episodes="anime?.episodes"
          :studio-name="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :genres="anime?.genres"
          v-for="anime in mediaBySeasonData?.LEFTOVERS?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <div
        id="specials"
        class="text-white text-2xl font-semibold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-2 mt-4"
        v-if="mediaBySeasonData?.SPECIALS?.media?.length"
      >
        {{ $t("home.body.specials") }}
      </div>
      <custom-grid v-if="mediaBySeasonData?.SPECIALS?.media?.length">
        <season-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :description="anime?.description ?? '-'"
          :next-episode="anime?.nextAiringEpisode?.episode"
          :episode-airing-at="anime?.nextAiringEpisode?.airingAt"
          :episodes="anime?.episodes"
          :studio-name="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :genres="anime?.genres"
          v-for="anime in mediaBySeasonData?.SPECIALS?.media"
          :key="anime?.id"
        />
      </custom-grid>

      <ad-container />

      <div :v-if="mediaBySeasonData?.TV?.media?.length === 0">
        {{ $t("home.body.nothing-found") }}
      </div>
    </div>
  </div>
</template>

