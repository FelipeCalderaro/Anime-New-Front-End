
<script setup lang="ts">
const route = useRoute();

const { data, error, status } = await useAsyncGql("characterInfo", {
  id: Number.parseInt(route.params.id as string),
});

if (status.value === "success") {
  const head = constructHead({
    title:
      data.value.Character?.name?.full ??
      data.value.Character?.name?.userPreferred,
    description: data.value.Character?.description,
    ogImage: data.value.Character?.image?.large,
    ogUrl: route.fullPath,
  });
  useHead({
    title: head.title,
    meta: head.meta,
    link: head.link,
    htmlAttrs: head.htmlAttrs,
  });
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
      <div id="title-section" class="w-full h-full flex flex-row pt-28 ml-20">
        <q-img
          class="w-[340px] h-[500px] rounded-lg"
          fit="cover"
          :src="data.Character?.image?.large ?? ''"
        />
        <div class="flex flex-col ml-6">
          <div class="text-neutral-50 text-5xl font-bold mb-6">
            {{
              data.Character?.name?.userPreferred ?? data.Character?.name?.full
            }}
          </div>

          <div class="text-neutral-50 text-2xl font-semibold my-2">
            {{ $t("character.about") }}
          </div>
          <div
            class="w-[690px] text-white text-base"
            v-html="data.Character?.description"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="px-2 sm:px-4 xl:px-40 2xl:px-[340px] grid md:gap-x-6 gap-y-4 md:gap-y-8 grid-cols-1 md:grid-cols-2 fhd:grid-cols-3 qhd:grid-cols-4"
    >
      <div
        class="flex flex-row bg-card-component h-40 items-center justify-between"
        v-for="media in data.Character?.media?.edges"
        :key="`${media?.id}`"
      >
        <q-img
          class="h-full cursor-pointer w-1/4"
          :src="media?.node?.coverImage?.large ?? ''"
          :alt="media?.node?.title?.english ?? ''"
          :title="media?.node?.title?.english ?? ''"
          @click="
            navigateTo(
              constructLocalePath(
                '/media',
                media?.node?.id,
                media?.node?.title?.userPreferred
              )
            )
          "
        />
        <div
          :id="`character-name-${media?.node?.title?.english}`"
          class="text-xs my-4 flex-initial w-1/3"
        >
          <div
            class="font-bold text-neutral-01"
            :title="
              media?.node?.title?.userPreferred ??
              media?.node?.title?.english ??
              ''
            "
          >
            {{
              media?.node?.title?.userPreferred ?? media?.node?.title?.english
            }}
          </div>
          <div class="font-semibold text-neutral-05">
            {{
              media?.voiceActors?.at(0)?.name?.userPreferred ??
              media?.voiceActors?.at(0)?.name?.full
            }}
          </div>
          <div class="font-medium text-[10px] text-neutral-06">
            {{ media?.voiceActors?.at(0)?.language }}
          </div>
        </div>

        <q-img
          class="h-full w-1/4"
          fit="cover"
          :alt="media?.voiceActors?.at(0)?.name?.userPreferred ?? ''"
          :title="media?.voiceActors?.at(0)?.name?.userPreferred ?? ''"
          :src="media?.voiceActors?.at(0)?.image?.large ?? ''"
        />
      </div>
    </div>
    <div class="h-[400px]"></div>
  </div>
</template>
