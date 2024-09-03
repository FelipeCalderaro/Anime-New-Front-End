<script setup lang="ts">
import { MediaSeason, type MediaBySeasonQuery } from "#gql/default";

const currentDate = new Date();

let mediaBySeasonData = ref<MediaBySeasonQuery | null>();
let loading: Ref<boolean> = ref(true);
let error = ref<null | Error>(null);
let currentYear: Ref<number> = ref(currentDate.getFullYear());
let seasonSelected: Ref<MediaSeason> = ref(getCurrentSeason());

async function getInitialSeason(season: MediaSeason, year: number) {
  loading.value = true;
  try {
    const queryData = await GqlMediaBySeason({
      season,
      year,
    });
    console.log(season, year);
    mediaBySeasonData.value = queryData;
    currentYear.value = year;
    seasonSelected.value = season;
  } catch (e) {
    error.value = e as Error;
  } finally {
    loading.value = false;
  }
}

await getInitialSeason(seasonSelected.value, currentYear.value);

function handleSeasonChange(season: MediaSeason, year: number) {
  getInitialSeason(season, year);
}
</script>

<template>
  <div>
    <home-banner id="caroussel" />
    <div id="content">
      <div
        class="mt-6 text-center text-neutral-50 text-[40px] sm:text-6xl font-medium leading-[60px]"
      >
        Guia de Temporadas de Anime do AnimeNew
      </div>

      <div
        class="mt-4 text-center text-neutral-50 text-[16px] sm:text-[22px] font-normal leading-[34px]"
      >
        Explore as Temporadas de Anime no AnimeNew: Lançamentos, Horários e
        Resumos
      </div>

      <div
        class="w-full h-[140px] sm:h-[60px] my-8 flex flex-row gap-4 justify-center text-white"
      >
        <season-button
          v-for="(seasonInfo, index) in getYearBySeason()"
          :key="index"
          :selected="seasonInfo.seasonEnum === seasonSelected"
          :label="`${seasonInfo.seasonName} ${seasonInfo.seasonYear}`"
          :on-click="
            () =>
              handleSeasonChange(seasonInfo.seasonEnum, seasonInfo.seasonYear)
          "
        />
      </div>

      <div class="justify-center w-full h-[90px] flex mb-8">
        <div class="w-[720px] h-[90px] bg-indigo-500 mx-5">ANUNCIO</div>
      </div>

      <div
        class="px-2 sm:px-4 xl:px-40 2xl:px-60 grid md:gap-x-6 gap-y-4 md:gap-y-8 grid-cols-1 md:grid-cols-2 fhd:grid-cols-3 qhd:grid-cols-4"
      >
        <season-cards
          :id="anime?.id ?? 0"
          :title="anime?.title?.romaji ?? '-'"
          :image-url="anime?.coverImage?.large ?? '-'"
          :description="anime?.description ?? '-'"
          :next-episode="anime?.nextAiringEpisode?.episode"
          :episode-airing-at="anime?.nextAiringEpisode?.airingAt"
          :episodes="anime?.episodes"
          :studio-name="anime?.studios?.nodes?.at(0)?.name ?? '-'"
          :genres="anime?.genres"
          v-for="anime in mediaBySeasonData?.Page?.media"
          :key="anime?.id"
        />
      </div>
      <div :v-if="mediaBySeasonData?.Page?.media?.length === 0">
        Nenhum anime encontrado ainda para a temporada selecionada
      </div>
    </div>
  </div>
</template>