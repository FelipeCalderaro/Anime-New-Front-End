<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

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
function onEpisodeSelected(url?: string): void {
  window.open(url);
}
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
            {{ $t("media.studio") }}:
            {{ data.Media?.studios?.edges?.at(0)?.node?.name }}
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
          {{ $t("media.related") }}
        </div>

        <horizontal-list class="h-[180px]">
          <q-card
            class="bg-card-component w-[280px] h-full mr-4 overflow-clip cursor-pointer"
            flat
            bordered
            v-for="media in data.Media?.relations?.edges"
            :key="`${media?.id}`"
            @click="navigateTo(localePath(`/media/${media?.node?.id}`))"
          >
            <q-card-section horizontal class="w-full h-full">
              <q-img
                width="120px"
                class="flex-shrink-0"
                fit="cover"
                :src="media?.node?.coverImage?.large ?? ''"
              />

              <q-card-section class="flex-grow">
                <div class="flex flex-col my-4">
                  <div class="text-neutral-50 text-base font-semibold">
                    {{ translateMediaRelation(media?.relationType) }}
                  </div>
                  <div
                    class="text-neutral-01 text-base font-semibold my-1 line-clamp-2"
                    :title="`${
                      media?.node?.title?.english ?? media?.node?.title?.romaji
                    }`"
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
        </horizontal-list>
      </div>

      <div id="watch" class="mt-8" v-if="data.Media?.streamingEpisodes?.length">
        <div class="text-white text-2xl font-semibold">
          {{ $t("media.watch") }}
        </div>
        <horizontal-list class="mt-2">
          <q-img
            class="flex-shrink-0 rounded-sm w-[340px] rounded-bl mb-4 cursor-pointer"
            :src="`${episode?.thumbnail}`"
            v-for="episode in [...data.Media.streamingEpisodes].reverse()"
            :key="`${episode?.url}`"
            @click="if (episode?.url) onEpisodeSelected(episode?.url);"
          >
            <div class="w-full h-full text-white text-xs font-semibold">
              <div
                class="w-full h-16 text-white text-xs absolute-bottom px-2 py-3 bg-neutral-900/40 line-clamp-2"
                :title="`${episode?.title}`"
              >
                <div class="text-neutral-01">
                  {{ episode?.site }}
                </div>
                {{ episode?.title }}
              </div>
            </div>
          </q-img>
        </horizontal-list>
      </div>

      <div
        id="characters"
        class="mt-8"
        v-if="data.Media?.charactersPreview?.edges"
      >
        <div class="text-white text-2xl font-semibold">
          {{ $t("media.characters") }}
        </div>

        <div class="grid grid-cols-3 gap-4 mt-2">
          <div
            class="flex flex-row bg-card-component items-center h-[160px]"
            v-for="character in data.Media?.charactersPreview?.edges"
            :key="`${character?.id}`"
          >
            <q-img
              class="w-[100px] qhd:w-[120px] h-full"
              fit="cover"
              :src="character?.node?.image?.large ?? ''"
            />
            <div
              :id="`character-name-${character?.node?.name?.first}`"
              class="text-neutral-01 text-xs mx-2 my-4"
            >
              <div class="font-semibold">
                {{
                  character?.node?.name?.userPreferred ??
                  character?.node?.name?.full
                }}
              </div>
              <div class="font-medium text-[10px] text-neutral-02">
                {{ translateCharacterRole(character?.role) }}
              </div>
            </div>

            <div class="flex-grow" />

            <div
              :id="`voice-actor-name-${
                character?.voiceActors?.at(0)?.name?.first
              }`"
              class="flex flex-col text-neutral-01 text-xs mx-2 my-4 justify-end items-end"
            >
              <div class="font-semibold">
                {{
                  character?.voiceActors?.at(0)?.name?.userPreferred ??
                  character?.voiceActors?.at(0)?.name?.full
                }}
              </div>
              <div class="font-semibold">
                {{ character?.voiceActors?.at(0)?.name?.native }}
              </div>
              <div class="font-medium text-[10px] text-neutral-02">
                {{ character?.voiceActors?.at(0)?.language }}
              </div>
            </div>
            <q-img
              class="w-[100px] qhd:w-[120px] h-full"
              fit="cover"
              v-if="character?.voiceActors?.at(0)?.image?.large"
              :src="character?.voiceActors?.at(0)?.image?.large ?? ''"
            />
            <div
              class="w-[100px] h-full bg-card-countdown-bg flex flex-col justify-center"
              v-else
            >
              <div class="text-neutral-02 px-2">{{ $t("media.no-image") }}</div>
            </div>
          </div>
        </div>
      </div>

      <div id="staff" class="mt-8">
        <div class="text-white text-2xl font-semibold">
          {{ $t("media.staff") }}
        </div>

        <div class="grid grid-cols-4 gap-4 mt-2">
          <div
            class="flex flex-row bg-card-component items-center h-[160px]"
            v-for="staff in data.Media?.staffPreview?.edges"
            :key="`${staff?.id}`"
          >
            <q-img
              class="w-[100px] qhd:w-[120px] h-full"
              fit="cover"
              :src="staff?.node?.image?.large ?? ''"
            />
            <div
              :id="`staff-name-${staff?.node?.name?.first}`"
              class="text-neutral-01 text-xs mx-2 my-4"
            >
              <div class="font-semibold">
                {{
                  staff?.node?.name?.userPreferred ?? staff?.node?.name?.full
                }}
              </div>
              <div class="font-medium text-[10px] text-neutral-02">
                {{ staff?.role }}
              </div>
            </div>

            <div class="flex-grow" />
          </div>
        </div>
      </div>

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