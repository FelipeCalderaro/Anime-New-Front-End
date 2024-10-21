<script setup lang="ts">
import type { AnimeNewPosts } from "~/types/AnimenewPosts";

const route = useRoute();

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

onMounted(() => {
  onMountToggleSpoiler();
});
</script>

<template>
  <div id="content">
    <q-img
      id="banner"
      class="w-full h-[900px] lg:h-[450px] 2xl:h-[672px] title-section"
      :style="{ paddingTop: 112 }"
      fit="cover"
      :src="data.Media?.bannerImage ?? ''"
    >
      <div
        id="title-section"
        class="w-full h-full flex flex-col md:flex-row items-center lg:items-start"
      >
        <q-img
          class="h-[200px] w-[150px] sm:w-[250px] sm:h-[360px] xl:w-[200px] xl:h-[300px] 2xl:w-[340px] 2xl:h-[500px] mt-8 sm:mt-0 rounded-lg"
          fit="cover"
          :src="data.Media?.coverImage?.extraLarge ?? ''"
        />
        <div
          class="sm:ml-6 sm:w-[350px] md:w-[500px] xl:w-[700px] text-ellipsis h-[300px]"
        >
          <div
            class="text-neutral-50 text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center md:text-left"
          >
            {{ data.Media?.title?.english ?? data.Media?.title?.romaji }}
          </div>
          <q-rating
            class="mt-3 text-white center"
            v-model="rating"
            size="1.5em"
            icon="star"
          />
          <div class="flex flex-row my-3">
            <GenreChip
              class="mr-2"
              :genre="genre ?? ''"
              v-for="genre in data.Media?.genres?.slice(0, 3)"
              :key="`genre-${genre}`"
            />
          </div>

          <div
            class="text-neutral-50 text-lg md:text-xl 2xl:text-2xl font-semibold my-1"
          >
            {{ $t("media.synopsis") }}
          </div>
          <div
            class="w-full text-ellipsis 2xl:text-pretty"
            v-html="data.Media?.description"
          ></div>

          <div class="text-neutral-50/80 text-base font-medium my-3">
            {{ $t("media.studio") }}:
            {{ data.Media?.studios?.edges?.at(0)?.node?.name }}
          </div>
        </div>
      </div>
    </q-img>

    <div class="mx-4 lg:mx-12 2xl:mx-64">
      <div
        id="related-content"
        class="mt-8"
        v-if="data.Media?.relations?.edges?.length"
      >
        <div class="text-white text-2xl font-semibold">
          {{ $t("media.related") }}
        </div>

        <horizontal-list class="h-[180px] gap-2">
          <q-card
            class="bg-card-component w-[280px] h-full overflow-clip cursor-pointer"
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
                    class="text-neutral-01 text-base font-semibold my-1 line-clamp-2"
                    :title="`${
                      media?.node?.title?.english ?? media?.node?.title?.romaji
                    }`"
                  >
                    {{
                      media?.node?.title?.english ?? media?.node?.title?.romaji
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
          >
            <div class="w-full h-full text-white text-xs font-semibold">
              <div
                class="w-full h-16 text-white text-xs absolute-bottom px-2 py-3 bg-neutral-900/60 line-clamp-2"
                :title="`${news?.title}`"
              >
                <div class="text-neutral-01">AnimeNew</div>
                <h6 v-html="news?.title" />
              </div>
            </div>
          </q-img>
        </horizontal-list>
      </div>

      <div
        id="characters"
        class="mt-8"
        v-if="data.Media?.charactersPreview?.edges"
      >
        <div class="text-white text-2xl font-semibold">
          {{ $t("media.characters") }}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-2">
          <div
            class="flex flex-row bg-card-component items-center h-[100px] 2xl:h-[160px]"
            v-for="character in data.Media?.charactersPreview?.edges"
            :key="`${character?.id}`"
          >
            <q-img
              class="w-[60px] 2xl:w-[100px] qhd:w-[120px] h-full cursor-pointer"
              fit="cover"
              :alt="character?.node?.name?.userPreferred ?? ''"
              :title="character?.node?.name?.userPreferred ?? ''"
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
            <div
              :id="`character-name-${character?.node?.name?.first}`"
              class="text-neutral-01 text-xs mx-2 my-4 w-[80px]"
            >
              <div class="font-semibold">
                {{
                  character?.node?.name?.userPreferred ??
                  character?.node?.name?.full
                }}
              </div>
              <div class="font-medium text-[10px] text-neutral-02">
                {{ translateCharacterRole(character?.role) }}
              </div>
            </div>

            <div class="flex-grow" />

            <div
              :id="`voice-actor-name-${
                character?.voiceActors?.at(0)?.name?.first
              }`"
              class="flex flex-col text-neutral-01 text-xs mx-2 my-4 justify-center items-center w-[80px] text-pretty"
            >
              <div class="font-semibold">
                {{
                  character?.voiceActors?.at(0)?.name?.userPreferred ??
                  character?.voiceActors?.at(0)?.name?.full
                }}
              </div>
              <div class="font-semibold">
                {{ character?.voiceActors?.at(0)?.name?.native }}
              </div>
              <div class="font-medium text-[10px] text-neutral-02">
                {{ character?.voiceActors?.at(0)?.language }}
              </div>
            </div>
            <q-img
              class="w-[60px] 2xl:w-[100px] qhd:w-[120px] h-full"
              fit="cover"
              v-if="character?.voiceActors?.at(0)?.image?.large"
              :src="character?.voiceActors?.at(0)?.image?.large ?? ''"
              :alt="character?.voiceActors?.at(0)?.name?.userPreferred ?? ''"
              :title="character?.voiceActors?.at(0)?.name?.userPreferred ?? ''"
            />
            <div
              class="w-[60px] 2xl:w-[100px] h-full bg-card-countdown-bg flex flex-col justify-center"
              v-else
            >
              <div class="text-neutral-02 px-2">{{ $t("media.no-image") }}</div>
            </div>
          </div>
        </div>
      </div>

      <div id="staff" class="mt-8">
        <div class="text-white text-2xl font-semibold">
          {{ $t("media.staff") }}
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
          <div
            class="flex flex-row bg-card-component items-center h-[120px] md:h-[160px]"
            v-for="staff in data.Media?.staffPreview?.edges"
            :title="staff?.node?.name?.userPreferred ?? ''"
            :key="`${staff?.id}`"
          >
            <q-img
              class="w-[70px] sm:w-[100px] qhd:w-[120px] h-full"
              fit="cover"
              :src="staff?.node?.image?.large ?? ''"
            />
            <div
              :id="`staff-name-${staff?.node?.name?.first}`"
              class="text-neutral-01 text-xs mx-2 my-4 w-[60px] md:w-2/4"
            >
              <div class="font-semibold">
                {{
                  staff?.node?.name?.userPreferred ?? staff?.node?.name?.full
                }}
              </div>
              <div class="font-medium text-[10px] text-neutral-02">
                {{ staff?.role }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="h-[400px]"></div>
    </div>
  </div>
</template>

<style>
/* Overrides the Quasar properties in the title-section  */
.title-section .q-img__content > div {
  @apply pt-28 mb-14 px-4 md:px-8 lg:px-20;
  @apply bg-gradient-to-t from-background from-0% via-background-55 via-25%;
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