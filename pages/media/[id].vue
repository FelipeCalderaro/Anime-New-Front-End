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
const rating = 3;
</script>

<template>
  <div>
    <q-img
      class="w-full h-[672px]"
      fit="cover"
      :src="data.Media?.bannerImage ?? ''"
    >
      <div id="title-section" class="w-full h-full flex flex-row">
        <q-img
          class="w-[340px] h-[500px]"
          fit="cover"
          :src="data.Media?.coverImage?.extraLarge ?? ''"
        />
        <div class="flex flex-col ml-6">
          <div class="text-neutral-50 text-5xl font-bold">
            {{ data.Media?.title?.english ?? data.Media?.title?.romaji }}
          </div>
          <q-rating class="mt-3" v-model="rating" size="1.5em" icon="star" />
          <div class="w-[450px]" v-html="data.Media?.description"></div>
        </div>
      </div>
    </q-img>
  </div>
</template>

<style>
/* Overrides the Quasar properties in the title-section  */
.q-img__content > div {
  @apply pt-28 pb-14;
}
</style>