<template>
  <q-card
    :id="'div-' + id"
    class="bg-card-component text-white w-full h-[280px]"
  >
    <q-card-section horizontal class="flex" style="height: inherit">
      <q-card-section class="flex-1 py-4 px-6" style="height: inherit">
        <div id="content" class="h-5/6 overflow-y-scroll custom-scrollbar">
          <div id="title" class="wrap text-neutral-50 text-base font-semibold">
            {{ title }}
          </div>

          <div class="text-neutral-50/90 text-[10px] font-medium">
            Estudio {{ studioName ?? "-" }}
          </div>

          <br />

          <div
            id="description"
            class="font-regular text-neutral-50/60 text-[10px] font-normal"
            v-html="description"
          ></div>
        </div>

        <div
          class="h-1/6 mt-1 justify-start items-center gap-2 inline-flex wrap"
        >
          <div
            class="px-3 py-1 bg-primary-10 rounded-md justify-center items-center flex"
            v-for="genre in genres?.slice(0, 3)"
            :key="'genre-' + genre"
          >
            <div
              class="text-neutral-50 text-[10px] font-medium leading-[13px] py-1"
            >
              {{ genre }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-img
        class="w-[150px] xs:w-[185px] h-full"
        fit="cover"
        :style="{ cursor: 'pointer' }"
        :src="imageUrl ?? '-'"
      >
        <div
          v-if="nextEpisode !== null && nextEpisode !== undefined"
          class="items-end absolute-bottom text-center bg-card-countdown-bg bg-opacity-80"
          style="height: 60px"
        >
          <p class="text-neutral-50/80 text-xs font-semibold">
            {{
              `Episódio  ${nextEpisode} ${
                episodes !== null ? " de " + episodes : ""
              } em:`
            }}
            <br />
            {{ timeToAirCountDown(episodeAiringAt) }}
          </p>
        </div>
      </q-img>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface SeasonCardsProps {
  id: number;
  title: string;
  imageUrl: string;
  studioName: string;
  description: string;
  genres?: (string | null)[] | null | undefined;
  episodeAiringAt?: number;
  nextEpisode?: number;
  episodes?: number | null;
}

const props = defineProps<SeasonCardsProps>();
</script>

<style>
</style>