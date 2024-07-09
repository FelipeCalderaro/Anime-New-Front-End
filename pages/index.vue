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
        <div
          id="cards-div"
          class=".col col-md-auto q-ma-md"
          v-for="animes in  data.Page?.media"
          :key="animes?.id"
        >
          <div
            class="card-border"
            :id=" 'div-' + animes?.id "
          >
            <!-- flat
              bordered
              @mouseover="onCardHover(animes.id)"
              @mouseleave="onCardHoverStop(animes.id)" -->
            <q-card class="card">
              <q-card-section horizontal>
                <q-card-section>
                  <div class="txt">
                    <q-scroll-area :style="{height: '150px'}">
                      <div class="text-area">
                        <p class="text-title font-extra-bold text-area">
                          {{ animes?.title?.romaji}}
                        </p>
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
                  height="265px"
                  width="185px"
                  :style="{cursor: 'pointer'}"
                  :src="animes?.coverImage?.extraLarge ?? '-'"
                >
                  <div
                    v-if="animes?.nextAiringEpisode !== null"
                    class="items-end absolute-bottom text-center"
                    style="height: 60px"
                  >
                    <p class="text-bold" style="width: 145px">
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