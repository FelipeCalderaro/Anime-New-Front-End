<template>
  <div class="text-white pt-20">
    <h1
      class="text-white text-2xl font-bold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-6"
    >
      {{ $t("results") }}
    </h1>

    <h2
      id="characters"
      v-if="searchResults?.Characters?.results?.length"
      class="text-white text-2xl font-semibold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-2 mt-8"
    >
      {{ $t("media.characters") }}
    </h2>

    <horizontal-list
      class="mx-2 sm:mx-4 xl:mx-40 2xl:mx-[340px]"
      v-if="searchResults.Characters?.results?.length"
    >
      <div
        class="h-[180px] w-[120px]"
        v-for="character in searchResults.Characters?.results"
        :key="character?.id"
      >
        <q-img
          fit="fill"
          :title="character?.name?.full ?? ''"
          :alt="character?.name?.full ?? ''"
          style="width: inherit; height: inherit"
          :src="character?.image?.large ?? ''"
          class="cursor-pointer"
          @click="
            navigateTo(
              constructLocalePath(
                '/character',
                character?.id,
                character?.name?.full
              )
            )
          "
        >
          <div class="absolute-bottom character-name :h-10">
            <h4 class="text-white font-semibold">
              {{ character?.name?.full }}
            </h4>
          </div>
        </q-img>
      </div>
    </horizontal-list>

    <h2
      id="staff"
      v-if="searchResults?.Characters?.results?.length"
      class="text-white text-2xl font-semibold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-2 mt-8"
    >
      {{ $t("media.staff") }}
    </h2>

    <horizontal-list
      class="mx-2 sm:mx-4 xl:mx-40 2xl:mx-[340px]"
      v-if="searchResults.Staff?.results?.length"
    >
      <div
        class="h-[180px] w-[120px]"
        v-for="staff in searchResults.Staff?.results"
        :key="staff?.id"
      >
        <q-img
          fit="fill"
          :title="staff?.name?.full ?? ''"
          :alt="staff?.name?.full ?? ''"
          style="width: inherit; height: inherit"
          :src="staff?.image?.large ?? ''"
          class="cursor-pointer"
          @click="
            navigateTo(
              constructLocalePath('/voice-actor', staff?.id, staff?.name?.full)
            )
          "
        >
          <div class="absolute-bottom character-name :h-10">
            <h4 class="text-white font-semibold">
              {{ staff?.name?.full }}
            </h4>
          </div>
        </q-img>
      </div>
    </horizontal-list>

    <h2
      id="anime"
      v-if="searchResults?.Anime?.results?.length"
      class="text-white text-2xl font-semibold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-2 mt-8"
    >
      {{ $t("anime") }}
    </h2>

    <custom-grid v-if="searchResults.Anime?.results?.length">
      <season-cards
        :id="anime?.id ?? 0"
        :title="anime?.title?.english ?? anime?.title?.romaji ?? '-'"
        :image-url="anime?.coverImage?.large ?? '-'"
        :description="anime?.description ?? '-'"
        :episodes="anime?.episodes"
        :studio-name="anime?.studios?.nodes?.at(0)?.name ?? '-'"
        :genres="anime?.genres"
        v-for="anime in searchResults.Anime.results"
        :key="anime?.id"
      />
    </custom-grid>

    <h2
      id="manga"
      v-if="searchResults?.Manga?.results?.length"
      class="text-white text-2xl font-semibold px-2 sm:px-4 xl:px-40 2xl:px-[340px] mb-2 mt-11"
    >
      Manga
    </h2>

    <custom-grid v-if="searchResults?.Manga?.results?.length">
      <season-cards
        :id="manga?.id ?? 0"
        :title="manga?.title?.english ?? manga?.title?.romaji ?? '-'"
        :image-url="manga?.coverImage?.large ?? '-'"
        :description="manga?.description ?? '-'"
        :episodes="manga?.episodes"
        :studio-name="manga?.studios?.nodes?.at(0)?.name ?? '-'"
        :genres="manga?.genres"
        v-for="manga in searchResults?.Manga.results"
        :key="manga?.id"
      />
    </custom-grid>
    <div
      class="w-full flex justify-center"
      v-if="
        !searchResults.Anime?.results?.length &&
        !searchResults.Manga?.results?.length &&
        !searchResults.Characters?.results?.length &&
        !searchResults.Staff?.results?.length
      "
    >
      <h1 class="self-center text-xl font-medium">
        {{ $t("search.empty") }}
      </h1>
    </div>
    <div class="pb-72"></div>
  </div>
</template>

<script setup lang="ts" >
const localePath = useLocalePath();
const route = useRoute();

interface SearchResultsProps {
  query: string;
}
const props = defineProps<SearchResultsProps>();
const query = deSlugify(route.params.query as string);
const { locale } = useI18n();

const {
  data: searchResults,
  error,
  status,
} = await useAsyncGql({
  operation: "search",
  variables: {
    isAdult: false,
    search: query || props.query,
  },
});

async function translateDescriptions() {
  if (locale.value !== "pt-br") return;
  if (!searchResults.value) return;
  let season = searchResults.value.Anime;
  if (season?.results) {
    for (let i = 0; i < season.results.length; i++) {
      const m = season.results[i];
      if (m?.id && m?.description) {
        try {
          const result = await translate(m?.id, m?.description);
          searchResults!.value.Anime!.results![i] = {
            ...m,
            description:
              result?.data.translation ||
              result?.data.description ||
              m?.description,
          };
        } catch (error) {
          console.error(`Error translating media ${m?.id}:`, error);
        }
      }
    }
  }
  season = searchResults.value.Manga;
  if (season?.results) {
    for (let i = 0; i < season.results.length; i++) {
      const m = season.results[i];
      if (m?.id && m?.description) {
        try {
          const result = await translate(m?.id, m?.description);
          searchResults!.value.Manga!.results![i] = {
            ...m,
            description:
              result?.data.translation ||
              result?.data.description ||
              m?.description,
          };
        } catch (error) {
          console.error(`Error translating media ${m?.id}:`, error);
        }
      }
    }
  }
}

if (status.value === "success") {
  if (locale.value === "pt-br") {
    translateDescriptions();
  }
}
</script>

<style>
.q-img__content > .character-name {
  /* background-color: transparent !important; */
  /* @apply bg-gradient-to-r from-indigo-800 via-transparent; */
  /* @apply bg-gradient-to-t from-background from-0% via-background-55 via-25%; */
  @apply py-1 px-1 line-clamp-1;
}
</style>