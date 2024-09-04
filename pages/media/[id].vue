<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { data, error, status } = await useAsyncGql("mediaInfo", {
  id: Number.parseInt(route.params.id as string),
});

function updatePagePath(mediaName?: string | null) {
  if (mediaName === null || mediaName === undefined) return;
  router.push({
    path: `${route.path}/${slugify(mediaName)}`,
  });
}

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
console.log(convertRating(data.value.Media?.averageScore ?? 0));
</script>

<template>
  <div class="grid grid-cols-1">
    <q-img
      class="w-full h-[672px] title-section"
      :style="{ paddingTop: 112 }"
      fit="cover"
      :src="data.Media?.bannerImage ?? ''"
    >
      <div id="title-section" class="w-full h-full flex flex-row">
        <q-img
          class="w-[340px] h-[500px] rounded-lg"
          fit="cover"
          :src="data.Media?.coverImage?.extraLarge ?? ''"
        />
        <div class="flex flex-col ml-6">
          <div class="text-neutral-50 text-5xl font-bold">
            {{ data.Media?.title?.english ?? data.Media?.title?.romaji }}
          </div>
          <q-rating
            class="mt-3 text-white"
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

          <div class="text-neutral-50 text-2xl font-semibold my-1">Sinopse</div>
          <div class="w-[690px] bgc-" v-html="data.Media?.description"></div>

          <div class="text-neutral-50/80 text-base font-medium my-3">
            Estudio: {{ data.Media?.studios?.edges?.at(0)?.node?.name }}
          </div>
        </div>
      </div>
    </q-img>

    <div class="mx-64">
      <div
        id="related-content"
        class="mt-8"
        v-if="data.Media?.relations?.edges?.length"
      >
        <div class="text-white text-2xl font-semibold">
          Conteúdo relacionado
        </div>

        <div class="flex flex-row mt-6 h-[160px] overflow-x-scroll">
          <q-card
            class="bg-card-component w-[280px] h-full mr-4 overflow-clip cursor-pointer"
            flat
            bordered
            v-for="media in data.Media?.relations?.edges"
            :key="`${media?.id}`"
            @click="navigateTo(`/media/${media?.node?.id}`)"
          >
            <q-card-section horizontal>
              <q-img
                class="w-[120px]"
                fit="cover"
                :src="media?.node?.coverImage?.large ?? ''"
              />

              <q-card-section class="w-[160px]">
                <div class="flex flex-col my-4">
                  <div class="text-neutral-50 text-base font-semibold">
                    {{ relationTypeTranslation(media?.relationType) }}
                  </div>
                  <div
                    class="text-neutral-01 text-base font-semibold my-1 line-clamp-2"
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
        </div>
      </div>

      <div id="watch" class="mt-8" v-if="data.Media?.streamingEpisodes?.length">
        <div class="text-white text-2xl font-semibold">Assista</div>

        <div
          class="flex no-wrap overflow-x-auto space-x-4 scrollbar-always-visible my-6"
        >
          <q-img
            class="flex-shrink-0 rounded-sm w-[340px] rounded-bl mb-4 cursor-pointer"
            :src="`${episode?.thumbnail}`"
            v-for="episode in data.Media.streamingEpisodes"
            :key="`${episode?.url}`"
          >
            <div class="w-full h-full text-white text-xs font-semibold">
              <div
                class="w-full h-16 text-white text-xs absolute-bottom px-2 py-3 bg-neutral-900/40 line-clamp-2"
              >
                <div class="text-neutral-01">
                  {{ episode?.site }}
                </div>
                {{ episode?.title }}
              </div>
            </div>
          </q-img>
        </div>
      </div>

      <div id="characters"></div>

      <div id="staff"></div>

      <div class="h-[400px]"></div>
    </div>
  </div>
</template>

<style>
/* Overrides the Quasar properties in the title-section  */
.title-section .q-img__content > div {
  @apply pt-28 pb-14 px-20;
  @apply bg-gradient-to-t from-background from-0% via-background-55 via-25%;
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