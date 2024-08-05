<script setup lang="ts">
import { MediaFormat, MediaSeason, MediaSort } from '#gql/default';

const currentDate = new Date();
const mediaBySeasonData  = await useAsyncGql({
    operation: 'mediaBySeason',
    variables: {
      season: MediaSeason.SUMMER,
      year: currentDate.getFullYear()
    }
});


</script>

<template>
<div>
  <home-banner />
  <div class="mt-6 text-center text-neutral-50 text-6xl font-medium leading-[60px]">
    Guia de Temporadas de Anime do AnimeNew
  </div>
  
  <div class="mt-4 text-center text-neutral-50 text-[22px] font-normal leading-[33.60px]">
    Explore as Temporadas de Anime no AnimeNew: Lançamentos, Horários e Resumos
  </div>

  <div class="w-full h-[60px] my-8 flex flex-row gap-4 justify-center text-white">
    <season-button :selected="false" label="Inverno 2024" :on-click="()=> {}" />
    <season-button :selected="false" label="Outono 2024" :on-click="()=> {}" />
    <season-button :selected="true" label="Verão 2024" :on-click="()=> {}" />
    <season-button :selected="false" label="Primavera 2024" :on-click="()=> {}" />    
  </div>

  <div class="relative justify-center mb-8 w-full h-[90px] flex">
    <div class="left-0 right-0 w-[720px] h-[90px] bg-indigo-500">
      ANUNCIO
    </div>
  </div>

  <div class="fit row wrap justify-between px-60">
    <div
      id="card-div"
      class="q-ma-md"
      v-for="anime in mediaBySeasonData.data.value.Page?.media"
      :key="anime?.id"
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
      />
    </div>
  </div>
</div>
</template>