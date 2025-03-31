
<script setup lang="ts">
const route = useRoute();

const { locale } = useI18n();

const { data, error, status } = await useAsyncGql("characterInfo", {
  id: Number.parseInt(route.params.id as string),
});

if (status.value === "success") {
  if (locale.value !== "en-US") {
    const result = await translate(
      data.value.Character!.id,
      data.value.Character!.description!,
      locale.value
    );
    if (result?.success) {
      const media = data.value.Character!;
      data.value.Character = {
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
      <div
        id="title-section"
        class="w-full h-full flex flex-col lg:flex-row pt-36 lg:pt-28 md:px-8 2xl:px-80 items-center md:items-start"
      >
        <q-img
          class="w-[170px] h-[240px] 2xl:w-[340px] 2xl:h-[500px] rounded-lg"
          fit="cover"
          :src="data.Character?.image?.large ?? ''"
          :alt="data.Character?.name?.full"
        />
        <div class="mx-6 md:mx-0 lg:ml-6">
          <div
            class="text-neutral-50 text-2xl 2xl:text-5xl font-bold mb-6 text-center md:text-start"
          >
            {{
              data.Character?.name?.full ?? data.Character?.name?.userPreferred
            }}
          </div>

          <div class="text-neutral-50 text-2xl font-semibold my-2">
            {{ $t("character.about") }}
          </div>
          <div
            class="w-full xl:w-[690px] text-white text-base"
            v-html="
              data.Character?.description?.replace(/(<br\s*\/?>){2,}/g, '<br>')
            "
          ></div>
        </div>
      </div>
    </div>

    <custom-grid>
      <div
        class="flex flex-row bg-card-component h-32 lg:h-40 items-center justify-start"
        v-for="media in data.Character?.media?.edges"
        :key="`${media?.id}`"
      >
        <q-img
          class="cursor-pointer w-[80px] h-full md:w-1/4"
          :src="media?.node?.coverImage?.large ?? ''"
          :alt="media?.node?.title?.english ?? ''"
          :title="media?.node?.title?.english ?? ''"
          @click="
            navigateTo(
              constructLocalePath(
                '/media',
                media?.node?.id,
                media?.node?.title?.english
              )
            )
          "
        />
        <div
          :id="`character-name-${media?.node?.title?.english}`"
          class="text-xs my-4 ml-4 flex-initial lg:w-1/3"
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
              media?.voiceActors?.at(0)?.name?.full ??
              media?.voiceActors?.at(0)?.name?.userPreferred
            }}
          </div>
          <div class="font-medium text-[10px] text-neutral-06">
            {{ media?.voiceActors?.at(0)?.language }}
          </div>
        </div>

        <div class="grow" />

        <q-img
          class="cursor-pointer w-[80px] h-full md:w-1/4"
          fit="cover"
          :alt="media?.voiceActors?.at(0)?.name?.userPreferred ?? ''"
          :title="media?.voiceActors?.at(0)?.name?.userPreferred ?? ''"
          :src="media?.voiceActors?.at(0)?.image?.large ?? ''"
          @click="
            navigateTo(
              constructLocalePath(
                '/voice-actor',
                media?.voiceActors?.at(0)?.id,
                media?.voiceActors?.at(0)?.name?.full
              )
            )
          "
        />
      </div>
    </custom-grid>

    <div class="h-[800px]" />
  </div>
</template>
