<script setup lang="ts">
import { MediaSort } from "#gql/default";

const route = useRoute();
const { locale } = useI18n();
const currentPage: Ref<number> = ref(1);

async function fetchData() {
  const { data, error, status } = await useAsyncGql("StudioInfo", {
    id: Number.parseInt(route.params.id as string),
    page: currentPage.value,
    sort: [MediaSort.START_DATE_DESC],
  });
  return { data, error, status };
}

function onDataLoaded() {
  // Add new media only if not already present
  const newMedias = data.value.Studio?.media?.edges as any[];

  // Filter out already existing items in medias
  const uniqueNewMedias = newMedias.filter(
    (newMedia) =>
      !medias.value.some((media) => media.node.id === newMedia.node.id)
  );

  if (uniqueNewMedias.length > 0) {
    medias.value.push(...uniqueNewMedias);
  }

  medias.value?.sort(
    (a, b) => (b.node?.seasonYear ?? 0) - (a.node?.seasonYear ?? 0)
  );

  medias.value?.forEach((e) => {
    if (e.node?.seasonYear !== null || e.node?.seasonYear !== undefined) {
      mediasByYear.value.set(
        e?.node?.seasonYear as number,
        medias.value?.filter((a) => a.node?.seasonYear == e.node?.seasonYear)
      );
    }
  });
}

let { data, error, status } = await fetchData();
// const { data: studios, error: studiosErrors } = await useFetch(
//   `/api/studios?name=${encodeURIComponent(route.params.slug as string)}`
// );

const { data: studioDetails, error: studioDetailsErrors } = await useFetch(
  `/api/studio-details?id=${encodeURIComponent(route.params.id)}`
);

const loadMoreTrigger = ref<HTMLElement | null>(null);
const hasNextPage = computed(
  () => data.value?.Studio?.media?.pageInfo?.hasNextPage
);

let mediasByYear: Ref<Map<number, any>> = ref(new Map());
const medias: Ref<any[]> = ref([]);

if (status.value === "success") {
  //   if (locale.value !== "en-US") {
  //     const result = await translate(
  //       data.value.Studio!.id,
  //       data.value.Studio!.description!,
  //       locale.value
  //     );
  //     if (result?.success) {
  //       const media = data.value.Staff!;
  //       data.value.Studio = {
  //         ...media,
  //         description:
  //           result?.data[locale.value] ||
  //           result?.data["en-US"] ||
  //           media?.description,
  //       };
  //     }
  //   }
  onDataLoaded();

  const head = constructHead({
    title: data.value.Studio?.name,
    description: `All Animes or Mangas produced by ${data.value.Studio?.name}`,
    // ogImage: data.value.Studio?.image?.large,
    ogUrl: route.fullPath,
  });
  useHead({
    title: head.title,
    meta: head.meta,
    link: head.link,
    htmlAttrs: head.htmlAttrs,
  });

  // If there is no Year but medias for any reason, merge the last with the null year
  // let mediasByYearKeys = [...mediasByYear.value.keys()];
  // let possibleNullValues = mediasByYear.value.get(
  //   mediasByYearKeys[mediasByYearKeys.length - 1]
  // );
  // let lastestYearValues = mediasByYear.value.get(
  //   Math.max(...mediasByYear.value.keys())
  // );

  // if (possibleNullValues !== lastestYearValues) {
  //   mediasByYear.value.set(Math.max(...mediasByYear.value.keys()) as number, [
  //     ...possibleNullValues,
  //     ...lastestYearValues,
  //   ]);
  // }
  mediasByYear.value = sortMapWithNullFirst(mediasByYear.value);
}

watch(error, () => {
  console.log(error);
});

watch(data, () => {
  if (data.value) {
    onDataLoaded();
  }
});

onMounted(() => {
  if (import.meta.client) {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasNextPage.value) {
          currentPage.value = currentPage.value + 1; // Increment page number
          let _d = await fetchData();
          data.value = _d.data.value;
        }
      },
      { rootMargin: "100px" }
    );

    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value);
    }
  }
});
</script>

<style>
</style>

<template>
  <div
    id="detail-container"
    class="w-full h-full flex flex-row pt-36 lg:pt-28 md:pl-6 xl:px-8 2xl:px-80 items-center md:items-start"
  >
    <q-img
      class="min-w-[170px] h-[240px] 2xl:min-w-[350px] 2xl:h-[400px] w-1/4 rounded-lg mr-4"
      fit="cover"
      :src="studioDetails.logo ?? ''"
      :alt="`${data.Studio?.name} - Logo`"
    />

    <div class="text-neutral-50 w-1/3">
      <h1 class="text-2xl 2xl:text-5xl font-bold text-center md:text-start">
        {{ data.Studio?.name }}
      </h1>
      <h2 class="mb-6">
        {{ studioDetails.japaneseName }}
      </h2>

      <div class="text-2xl font-semibold my-2">
        {{ $t("studio.about") }}
      </div>
      <p class="">
        {{ `${$t("studio.established")}: ${studioDetails.established}` }}
      </p>
      <p class="w-full">
        {{ studioDetails.description }}
      </p>
    </div>

    <div class="grow"></div>

    <div class="flex flex-col">
      <h3 v-if="studioDetails.links" class="text-neutral-50 text-lg">
        {{ $t("studio.links") }}
      </h3>
      <ul id="links" class="text-primary01 flex flex-col list-disc">
        <li v-for="(details, i) in studioDetails.links" :key="i">
          <a :href="details">{{ details }}</a>
        </li>
      </ul>
      <h3 v-if="studioDetails.related" class="text-neutral-50">
        {{ $t("studio.related") }}
      </h3>
      <ul id="related-links" class="text-primary01 flex flex-col list-disc">
        <li v-for="(details, i) in studioDetails.related" :key="i">
          <a :href="details">{{ details }}</a>
        </li>
      </ul>
    </div>
  </div>

  <div id="media-by-year" class="text-white">
    <div v-for="[key, medias] in mediasByYear" :key="key">
      <h3
        class="text-primary01 text-2xl font-semibold font-sans mt-8 mb-4 mx-2 xl:mx-8 2xl:mx-80"
        v-if="key !== null"
      >
        {{ key }}
      </h3>
      <h3
        class="text-primary01 text-2xl font-semibold font-sans mt-8 mb-4 mx-2 xl:mx-8 2xl:mx-80"
        v-else
      >
        {{ $t("tba") }}
      </h3>
      <custom-grid>
        <div
          class="flex-col bg-cardComponent items-center max-h-[350px] max-w-[200px]"
          v-for="media in medias"
          :key="media.id"
        >
          <q-img
            class="h-5/6 cursor-pointer"
            fit="cover"
            :alt="media.node?.title?.english ?? ''"
            :title="media?.node?.title?.english ?? ''"
            @click="
              navigateTo(
                constructLocalePath(
                  '/media',
                  media.node.id,
                  media?.node?.title?.english ?? media?.node?.title?.romaji
                )
              )
            "
            :src="media?.node?.coverImage?.large ?? ''"
          />

          <div
            :id="`media-name-${media?.node?.title?.english}`"
            class="text-neutral01 text-xs px-6 py-4"
          >
            <div class="font-semibold line-clamp-2">
              {{ media?.node?.title?.english ?? media?.node?.title?.romaji }}
            </div>
          </div>
        </div>
      </custom-grid>
    </div>
  </div>

  <div class="h-[240px] w-[10px]" />
  <!-- This triggers loading when visible -->
  <div ref="loadMoreTrigger"></div>
</template>
