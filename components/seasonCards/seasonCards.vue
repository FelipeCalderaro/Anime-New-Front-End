<template>
  <div
        class="card-border"
        :id="'div-' + id"
      >
        <q-card 
          class="bg-card-component text-white"
          style="width: 500px; height: 300px;"  
        >
          <q-card-section horizontal class="flex" style="height: inherit">
            <q-card-section class="flex-1 py-4 px-6" style="height: inherit">
                <div id="content" class="h-5/6 overflow-y-scroll custom-scrollbar">

                  <div id="title" class="wrap text-neutral-50 text-base font-semibold">
                    {{ title }}
                  </div>
                  
                  <div class="text-neutral-50/90 text-[10px] font-medium">
                    Estudio {{ studioName ?? '-' }}
                  </div>
                  
                  <br />
                  
                  <div 
                    id="description" 
                    class="font-regular text-neutral-50/60 text-[10px] font-normal" 
                    v-html="description" 
                  ></div>
                  
                </div>

                
                <div class="h-1/6 mt-1 justify-start items-center gap-2 inline-flex wrap">
                  <div 
                    class="px-3 py-1 bg-primary-10 rounded-md justify-center items-center flex"
                    v-for="genre in genres?.slice(0, 3)"
                    :key="'genre-' + genre"
                  >
                    <div class="text-neutral-50 text-[10px] font-medium leading-[14px] py-1">{{ genre }}</div>
                  </div>
                </div>
                  
            </q-card-section>

            <q-img
              class="w-[210px] h-[300px]"
              fit="fill"
              :style="{cursor: 'pointer'}"
              :src="imageUrl ?? '-'"
            >
              <div
                v-if="nextEpisode !== null"
                class="items-end absolute-bottom text-center bg-card-countdown-bg bg-opacity-80"
                style="height: 60px"
              >
                <p class="text-neutral-50/80 text-xs font-semibold">
                  {{ `Episódio  ${nextEpisode} ${episodes !== null  ? ' de ' + episodes: ''} em:` }}
                  <br>
                  {{ timeToAirCountDown(episodeAiringAt) }}
                  <!-- {{ animes?.nextAiringEpisode?.airingAt }} -->
                </p>
              </div>
            </q-img>
          </q-card-section>
        </q-card>
      </div>
</template>

<script setup lang="ts">
interface SeasonCardsProps {
  id: number
  title: string
  imageUrl: string
  studioName: string
  description: string
  genres?: (string | null)[] | null | undefined
  episodeAiringAt?: number
  nextEpisode?: number
  episodes?: number | null
}

const props = defineProps<SeasonCardsProps>();

</script>

<style>

</style>