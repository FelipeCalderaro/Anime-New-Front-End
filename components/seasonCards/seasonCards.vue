<template>
  <q-card
    :id="'div-' + id"
    class="bg-card-component text-white w-full h-[280px] cursor-pointer"
    v-on:click="
      async () => await navigateTo(localePath(`/media/${id}/${slugify(title)}`))
    "
  >
    <q-card-section horizontal class="flex" style="height: inherit">
      <q-card-section class="flex-1 py-4 px-6" style="height: inherit">
        <div id="content" class="h-5/6 overflow-y-scroll custom-scrollbar">
          <h3 id="title" class="wrap text-neutral-50 text-base font-semibold">
            {{ title }}
          </h3>

          <div class="text-neutral-50/90 text-[10px] font-medium">
            {{ $t("media.studio") }} {{ studioName ?? "-" }}
          </div>

          <br />

          <p
            id="description"
            class="font-regular text-neutral-50/60 text-[10px] font-normal"
            v-html="description"
          ></p>
        </div>

        <div
          class="flex h-1/6 mt-1 justify-start items-center gap-2 no-wrap overflow-x-auto"
        >
          <GenreChip
            :genre="genre ?? ''"
            v-for="genre in genres?.slice(0, 2)"
            :key="'genre-' + genre"
            :title="genre"
          />
        </div>
      </q-card-section>

      <q-img
        class="w-[150px] xs:w-[185px] h-full"
        fit="cover"
        :style="{ cursor: 'pointer' }"
        :src="imageUrl ?? '-'"
        :alt="title"
        :title="title"
      >
        <div
          v-if="nextEpisode !== null && nextEpisode !== undefined"
          class="items-end absolute-bottom text-center"
          style="height: 70px"
        >
          <h6 class="text-neutral-50/80 text-sm font-semibold">
            {{ $t("media.episode") }} {{ nextEpisode }}
            {{
              episodes !== null ? $t("media.episode.of") + "  " + episodes : ""
            }}
            <br />
            <p class="text-xs">
              {{ timeToAirDate(episodeAiringAt) }}
            </p>
          </h6>
        </div>
      </q-img>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

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
defineProps<SeasonCardsProps>();
</script>

<style>
.q-img__content > div {
  @apply py-3 bg-card-countdown-bg bg-opacity-80;
}
</style>