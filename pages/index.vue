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
  <div class="fit row wrap justify-between">

    <div
      id="card-div" 
      class="q-ma-md"
      v-for="animes in  data.Page?.media"
      :key="animes?.id"
    >
      <div
        class="card-border"
        :id=" 'div-' + animes?.id "
      >
        <q-card 
            style="width: 500px; height: 300px;"
            dark
        >
          <q-card-section horizontal>
            <q-card-section class="col-grow">
              <div class="txt">
                <q-scroll-area :style="{height: '200px'}">
                  <div class="text-area">
                    <h6 class="text-title font-extra-bold text-area">
                      {{ animes?.title?.romaji}}
                    </h6>
                  </div>
                  <div v-html="animes?.description" class="text-description font-regular"></div>
                </q-scroll-area>

                <div class="producer-container">
                  <p class="q-ma-xs font-regular">
                    {{ animes?.studios?.nodes?.at(0)?.name ?? '-' }}
                  </p>
                </div>

                <q-separator
                  class="separator-color"
                  style="height:1px; background: #c6c6c6"
                />
                <div class="row q-py-xs">
                  <div class="col col-md-12">
                    <q-chip
                      v-for="genre in (animes?.genres?.slice(0, 3))"
                      :key="'genre-' + genre "
                      class="chips font-bold"
                      size="9px"
                    >
                      {{ genre }}
                    </q-chip>
                  </div>
                </div>

              </div>
            </q-card-section>

            <q-img
                class="col-5"
                fit="cover"
                :style="{cursor: 'pointer'}"
                :src="animes?.coverImage?.extraLarge ?? '-'"
            >
              <div
                v-if="animes?.nextAiringEpisode !== null"
                class="items-end absolute-bottom text-center"
                style="height: 60px"
              >
                <p class="text-bold">
                  {{ 'Episódio ' + animes?.nextAiringEpisode?.episode + ' em:' }}
                  <br>
                  {{ timeToAirCountDown(animes?.nextAiringEpisode?.airingAt) }}
                  <!-- {{ animes?.nextAiringEpisode?.airingAt }} -->
                </p>
              </div>
            </q-img>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- <NuxtWelcome /> -->
</div>
</template>