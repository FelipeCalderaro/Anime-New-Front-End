<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const { data, error, status } = await useAsyncGql("voiceActorInfo", {
  id: Number.parseInt(route.params.id as string),
});

let mediasByYear: Ref<Map<number, any>> = ref(new Map());

if (status.value === "success") {
  if (locale.value !== "en-US") {
    const result = await translate(
      data.value.Staff!.id,
      data.value.Staff!.description!,
      locale.value
    );
    if (result?.success) {
      const media = data.value.Staff!;
      data.value.Staff = {
        ...media,
        description:
          result?.data[locale.value] ||
          result?.data["en-US"] ||
          media?.description,
      };
    }
  }
  const head = constructHead({
    title:
      data.value.Staff?.name?.full ?? data.value.Staff?.name?.userPreferred,
    description: data.value.Staff?.description,
    ogImage: data.value.Staff?.image?.large,
    ogUrl: route.fullPath,
  });
  useHead({
    title: head.title,
    meta: head.meta,
    link: head.link,
    htmlAttrs: head.htmlAttrs,
  });

  let allMedias = data.value.Staff?.characters?.edges?.flatMap((edges) => {
    let medias: any[] = [];
    edges?.media?.forEach((media) => {
      medias.push({
        characterId: edges.node?.id,
        ...edges?.node,
        role: edges?.role,
        ...media,
      });
    });

    return medias.flat();
  });
  allMedias?.sort((a, b) => (b?.seasonYear ?? 0) - (a?.seasonYear ?? 0));
  allMedias?.forEach((e) => {
    if (e?.seasonYear !== null || e.seasonYear !== undefined) {
      mediasByYear.value.set(
        e!.seasonYear as number,
        allMedias?.filter((a) => a?.seasonYear == e?.seasonYear)
      );
    }
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

onMounted(() => {
  onMountToggleSpoiler();
});
</script>

<style>
</style>

<template>
  <div>
    <div id="detail-container" class="mb-11">
      <div
        id="title-section"
        class="w-full h-full flex flex-col lg:flex-row pt-36 lg:pt-28 md:px-8 2xl:px-80 items-center md:items-start"
      >
        <q-img
          class="w-[170px] h-[240px] 2xl:w-[340px] 2xl:h-[500px] rounded-lg"
          fit="cover"
          :src="data.Staff?.image?.large ?? ''"
          :alt="data.Staff?.name?.full"
        />
        <div class="mx-6 md:mx-0 lg:ml-6">
          <div
            class="text-neutral-50 text-2xl 2xl:text-5xl font-bold mb-6 text-center md:text-start"
          >
            {{ data.Staff?.name?.userPreferred ?? data.Staff?.name?.full }}
          </div>

          <div class="text-neutral-50 text-2xl font-semibold my-2">
            {{ $t("staff.about") }}
          </div>
          <div
            class="w-full xl:w-[690px] text-white text-base"
            v-html="
              data.Staff?.description?.replace(/(<br\s*\/?>){2,}/g, '<br>')
            "
          ></div>
        </div>
      </div>
    </div>
    <!-- <div class="text-white">{{ [...mediasByYear.entries()] }}</div> -->
    <div id="characters-by-year" class="text-white mx-8 2xl:mx-80">
      <div v-for="[key, medias] in mediasByYear" :key="key">
        <h3
          class="text-primary01 text-2xl font-semibold font-sans mt-8 mb-4"
          v-if="key !== null"
        >
          {{ key }}
        </h3>
        <h3
          class="text-primary01 text-2xl font-semibold font-sans mt-8 mb-4"
          v-else
        >
          {{ $t("tba") }}
        </h3>
        <div
          class="md:gap-x-6 gap-y-4 md:gap-y-8 grid grid-cols-1 xl:grid-cols-3 qhd:grid-cols-4"
        >
          <div
            class="w-full flex flex-row bg-cardComponent items-center h-[130px] 2xl:h-[160px]"
            v-for="media in medias"
            :key="media.id"
          >
            <q-img
              class="w-1/4 h-full cursor-pointer"
              fit="cover"
              v-if="media.image?.large"
              :src="media.image?.large ?? ''"
              :alt="media.name?.userPreferred ?? ''"
              :title="media.name?.userPreferred ?? ''"
              @click="
                navigateTo(
                  constructLocalePath(
                    '/characterId',
                    media.characterId,
                    media.name?.full
                  )
                )
              "
            />

            <div class="w-1/2 h-full flex flex-row gap items-center">
              <div
                :id="`character-name-${media.name.userPreferred}`"
                class="w-1/3 flex flex-col text-neutral01 text-xs mx-2 my-4 justify-start items-start text-pretty text-center"
              >
                <h4 class="font-semibold text-nowrap text-left">
                  {{
                    media.name.userPreferred.trim() ?? media.name.full.trim()
                  }}
                </h4>
                <h6 class="font-medium text-[10px] text-neutral02">
                  {{ translateCharacterRole(media?.role) }}
                </h6>
              </div>

              <div class="flex-grow" />

              <p
                :id="`media-name-${media?.title.english}`"
                class="text-neutral01 text-xs mx-2 my-4 w-1/3 font-semibold text-balance"
              >
                {{ media.title.english ?? media.title.romaji }}
              </p>
            </div>

            <q-img
              class="w-1/4 h-full cursor-pointer"
              fit="cover"
              :alt="media.title.userPreferred ?? ''"
              :title="media.title.userPreferred ?? ''"
              @click="
                navigateTo(
                  constructLocalePath(
                    '/media',
                    media.id,
                    media.title?.userPreferred
                  )
                )
              "
              :src="media.coverImage.large ?? ''"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="h-[800px]" />
  </div>
</template>
