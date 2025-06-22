<script setup lang="ts">
import type { AnimeNewPosts } from "~/types/AnimenewPosts";

const route = useRoute();
const { locale } = useI18n();

const { data, error, status } = await useAsyncGql("mediaInfo", {
  id: Number.parseInt(route.params.id as string),
});

const {
  data: newsData,
  error: newsError,
  status: newsStatus,
} = await useFetch<AnimeNewPosts[]>(
  "https://animenew.com.br/wp-json/custom-api/v1/search",
  {
    params: { query: data.value.Media?.title?.english, perPage: 15 },
  }
);

if (status.value === "success") {
  if (locale.value !== "en-US") {
    const result = await translate(
      data.value.Media!.id,
      data.value.Media!.description!,
      locale.value
    );
    if (result?.success) {
      const media = data.value.Media!;
      data.value.Media = {
        ...media,
        description:
          result?.data[locale.value] ||
          result?.data["en-US"] ||
          media?.description,
      };
    }
  }
  const head = constructHead({
    title: data.value.Media?.title?.english ?? data.value.Media?.title?.romaji,
    description: data.value.Media?.description,
    ogImage: data.value.Media?.coverImage?.extraLarge,
    ogUrl: route.fullPath,
  });
  useHead({
    title: head.title,
    meta: head.meta,
    link: head.link,
    htmlAttrs: head.htmlAttrs,
  });
}

function convertRating(rating: number): number {
  return Math.floor(rating / 20 + 0.5);
}

const rating = convertRating(data.value.Media?.averageScore ?? 0);
function onNewsSelected(url?: string): void {
  window.open(url);
}

function hideById(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;

  // Clear previously applied responsive classes
  element.classList.remove("hidden", "block", "flex");

  // Tailwind breakpoints
  const lg = window.matchMedia("(min-width: 1024px)");
  const md = window.matchMedia("(min-width: 768px)");

  if (lg.matches) {
    element.classList.add("flex"); // Apply 'flex' on large screens and above
  } else if (md.matches) {
    element.classList.add("block"); // Apply 'block' on medium screens
  } else {
    element.classList.add("hidden"); // Hide on small screens
  }
}

onMounted(() => {
  onMountToggleSpoiler();
});
</script>

<template>
  <div id="content">
    <div class="w-full mb-8 banner-gradient lg:px-40 2xl:px-80">
      <div class="banner-gradient">
        <q-img
          id="banner"
          class="h-[200px] md:rounded-b-md title-section md:h-[400px]"
          fit="cover"
          :src="data.Media?.bannerImage ?? data.Media?.coverImage?.extraLarge"
          :alt="`${data.Media?.title?.english} - Banner`"
        >
        </q-img>
      </div>
    </div>

    <div
      class="mx-4 flex flex-col flex-nowrap md:gap-8 lg:mx-40 md:flex-row 2xl:mx-80"
    >
      <div id="details" class="flex flex-col md:min-w-[260px] md:max-w-[300px]">
        <q-img
          class="w-1/2 self-center rounded-lg mb-2 md:w-full"
          fit="cover"
          :src="data.Media?.coverImage?.extraLarge ?? ''"
          :alt="`${data.Media?.title?.english} - Cover Image`"
        />

        <!-- Hidden when desktop Layout -->
        <h1
          id="mediaTitleDetails"
          class="text-words self-center mb-2 text-2xl font-bold text-left sm:hidden"
        >
          {{ data.Media?.title?.english ?? data.Media?.title?.romaji }}
        </h1>

        <Box class="my-2" :title="$t('media.information')">
          <div class="flex flex-col gap-2 mt-2 text-sm">
            <InfoLine
              :label="$t('media.format')"
              :value="data.Media?.format ?? '-'"
            />
            <InfoLine
              :label="$t('media.episodes')"
              :value="data.Media?.episodes?.toString() ?? '-'"
            />
            <InfoLine
              :label="$t('media.duration')"
              :value="data.Media?.duration?.toString() ?? '-'"
            />
            <InfoLine
              :label="$t('media.status')"
              :value="translateMediaStatus(data.Media?.status)"
            />
            <InfoLine
              :label="$t('media.season')"
              :value="`${translateMediaSeason(data.Media?.season)} ${
                data.Media?.seasonYear
              }`"
            />

            <InfoLine
              :label="$t('media.score')"
              :value="`${data.Media?.averageScore}%`"
              score
            />
          </div>
        </Box>

        <Box class="my-2" :title="$t('media.studios')">
          <p
            v-for="studio in data.Media?.studios?.edges"
            :key="studio?.node?.id"
          >
            <a
              class="cursor-pointer text-primary01 underline"
              @click="
                navigateTo(
                  constructLocalePath(
                    '/studio',
                    studio?.node?.id,
                    studio?.node?.name
                  )
                )
              "
            >
              {{ studio?.node?.name }}
            </a>
          </p>
        </Box>

        <Box class="my-2" :title="$t('media.genre')">
          <div class="flex flex-row my-3 gap-y-2">
            <GenreChip
              class="mr-2"
              :genre="genre ?? ''"
              v-for="genre in data.Media?.genres"
              :key="`genre-${genre}`"
            />
          </div>
        </Box>
      </div>

      <div id="information" class="flex flex-col grow">
        <h1
          id="mediaTitle"
          class="text-words mb-2 text-4xl font-bold text-left collapse md:visible"
        >
          {{ data.Media?.title?.english ?? data.Media?.title?.romaji }}
        </h1>

        <Box class="my-2" :title="$t('media.synopsis')">
          <p
            class="text-ellipsis max-h-60 overflow-y-auto custom-scrollbar"
            v-html="data.Media?.description"
          ></p>
        </Box>

        <Box
          class="my-2"
          title="Trailer"
          v-if="data.Media?.trailer?.site === 'youtube'"
        >
          <youtube-embed
            class="w-full h-[200px] md:h-[350px] lg:h-[500px]"
            :id="data.Media?.trailer?.id ?? '-'"
            :title="data.Media.title?.userPreferred ?? '-'"
          />
        </Box>

        <Box :title="$t('media.characters')">
          <div
            id="characters"
            class=""
            v-if="data.Media?.charactersPreview?.edges"
          >
            <div
              class="grid grid-cols-2 gap-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-4"
            >
              <div
                class="flex flex-row bg-uiComponent rounded-md items-center h-[120px] md:h-[140px] 2xl:h-[160px]"
                v-for="character in data.Media?.charactersPreview?.edges"
                :key="`${character?.id}`"
              >
                <q-img
                  class="w-1/2 h-full cursor-pointer rounded-s-md"
                  fit="cover"
                  :alt="character?.node?.name?.full ?? ''"
                  :title="character?.node?.name?.full ?? ''"
                  @click="
                    navigateTo(
                      constructLocalePath(
                        '/character',
                        character?.node?.id,
                        character?.node?.name?.full
                      )
                    )
                  "
                  :src="character?.node?.image?.large ?? ''"
                />
                <div class="flex flex-row w-1/2 h-full items-center">
                  <div
                    :id="`character-name-${character?.node?.name?.first}`"
                    class="text-neutral01 text-xs mx-2 my-4"
                  >
                    <div class="font-semibold">
                      {{
                        character?.node?.name?.full ??
                        character?.node?.name?.userPreferred
                      }}
                    </div>
                    <div class="text-words">
                      {{ character?.node?.name?.native }}
                    </div>
                    <div class="font-medium text-[10px] text-primary01">
                      {{ translateCharacterRole(character?.role) }}
                    </div>
                  </div>

                  <div class="flex-grow" />
                </div>
              </div>
            </div>
          </div>
        </Box>

        <Box id="staff" class="my-2" :title="$t('media.staff')">
          <div
            class="grid grid-cols-2 gap-2 lg:grid-cols-3 md:gap-4 2xl:grid-cols-4"
          >
            <div
              class="flex flex-row bg-uiComponent items-center rounded-md h-[120px] md:h-[140px] 2xl:h-[160px]"
              v-for="staff in data.Media?.staffPreview?.edges"
              :title="staff?.node?.name?.full ?? ''"
              :key="`${staff?.id}`"
            >
              <q-img
                class="w-1/2 h-full rounded-s-md"
                fit="cover"
                :src="staff?.node?.image?.large ?? ''"
                :alt="staff?.node?.name?.first"
              />
              <div
                :id="`staff-name-${staff?.node?.name?.first}`"
                class="text-neutral01 w-1/2 text-xs px-2 py-4"
              >
                <div class="font-semibold">
                  {{
                    staff?.node?.name?.full ?? staff?.node?.name?.userPreferred
                  }}
                </div>
                <div class="font-medium text-[10px] text-primary01">
                  {{ staff?.role }}
                </div>
              </div>
            </div>
          </div>
        </Box>
        <!-- <div
          id="related-content"
          class="mt-8"
          v-if="data.Media?.relations?.edges?.length"
        >
          <div class="text-white text-2xl font-semibold">
            {{ $t("media.related") }}
          </div>

          <horizontal-list class="h-[180px] gap-2">
            <q-card
              class="bg-cardComponent w-[280px] h-full overflow-clip cursor-pointer"
              flat
              bordered
              v-for="media in data.Media?.relations?.edges"
              :key="`${media?.id}`"
              :title="
                media?.node?.title?.english ?? media?.node?.title?.romaji ?? ''
              "
              @click="
                navigateTo(
                  constructLocalePath(
                    '/media',
                    media?.node?.id,
                    media?.node?.title?.english
                  )
                )
              "
            >
              <q-card-section horizontal class="w-full h-full">
                <q-img
                  width="120px"
                  class="flex-shrink-0"
                  fit="cover"
                  :src="media?.node?.coverImage?.large ?? ''"
                  :title="
                    media?.node?.title?.english ??
                    media?.node?.title?.romaji ??
                    ''
                  "
                  :alt="
                    media?.node?.title?.english ??
                    media?.node?.title?.romaji ??
                    ''
                  "
                />

                <q-card-section class="flex-grow">
                  <div class="flex flex-col my-4">
                    <div class="text-neutral-50 text-base font-semibold">
                      {{ translateMediaRelation(media?.relationType) }}
                    </div>
                    <div
                      class="text-neutral01 text-base font-semibold my-1 line-clamp-2"
                      :title="`${
                        media?.node?.title?.english ??
                        media?.node?.title?.romaji
                      }`"
                    >
                      {{
                        media?.node?.title?.english ??
                        media?.node?.title?.romaji
                      }}
                    </div>
                    <div class="text-neutral-50/90 text-[10px] font-medium">
                      {{ media?.node?.format }} ·
                      {{ translateMediaStatus(media?.node?.status) }}
                    </div>
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </horizontal-list>
        </div>

        <div id="read" class="mt-8" v-if="newsData?.length">
          <div class="text-white text-2xl font-semibold">
            {{ $t("media.news.about") }}
          </div>
          <horizontal-list class="mt-2">
            <q-img
              class="news flex-shrink-0 rounded-sm h-[140px] w-[210px] lg:h-full lg:w-[340px] rounded-bl mb-4 cursor-pointer"
              :src="`${news?.image}`"
              v-for="news in newsData"
              :key="`${news.id}`"
              @click="if (news?.url) onNewsSelected(news?.url);"
              :alt="news?.title"
            >
              <div class="w-full h-full text-white text-xs font-semibold">
                <div
                  class="w-full h-16 text-white text-xs absolute-bottom px-2 py-3 bg-neutral-900/60 line-clamp-2"
                  :title="`${news?.title}`"
                >
                  <div class="text-neutral01">AnimeNew</div>
                  <h6 v-html="news?.title" />
                </div>
              </div>
            </q-img>
          </horizontal-list>
        </div>

        

         -->
      </div>
    </div>
    <div class="h-[400px]"></div>
  </div>
</template>

<style>
/* Overrides the Quasar properties in the title-section  */
.title-section .q-img__content > div {
  /* width: 100%; */
  @apply pt-28 mb-14 px-4 md:px-8 2xl:px-80;
  @apply bg-gradient-to-t from-background from-0% via-background55 via-25%;
}

.banner-gradient {
  @apply bg-gradient-to-t from-background from-0% via-background55 via-25%;
}

.news .q-img__content > div {
  @apply bg-transparent;
}

.scrollbar-always-visible {
  scrollbar-width: auto; /* For Firefox */
  overflow-x: scroll; /* Ensure scrollbar is always visible on the y-axis */
}

/* For WebKit browsers (Chrome, Safari) */
.scrollbar-always-visible::-webkit-scrollbar {
  display: block;
}
</style>