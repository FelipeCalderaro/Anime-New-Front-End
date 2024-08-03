<script setup lang="ts">
import { MediaSeason } from '#gql/default';

const { data } = await useAsyncGql({
    operation: 'mediaBySeason',
    variables: {
        season: MediaSeason.SUMMER,
        year: 2024
    }
});


</script>

<template>
<div>
  <home-banner />
  <div class="fit row wrap justify-between px-60">
    <div
      id="card-div"
      class="q-ma-md"
      v-for="anime in data.Page?.media"
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