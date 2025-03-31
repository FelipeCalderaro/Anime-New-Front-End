<script setup lang="ts">
// To use a different layout on a specific page, define the layout property using definePageMeta.
// definePageMeta({
//     layout: "default"
// })
function hijackFilter(url: string) {
  return /^https:\/\/graphql\.anilist\.co/.test(url);
}

const route = useRoute();
useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

useHead({
  meta: [{ property: "og:title", content: `${route.meta.title}` }],
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
    },
  ],
});
</script>

<template>
  <div class="DefaultLayou">
    <!-- Component import example -->
    <!-- <Example title="Example title" message="This is an example usage message"
            :on-click="() => console.log('Example Click')" /> -->
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="primary-09"
      size="6px"
      :hijack-filter="hijackFilter"
    />
    <q-layout class="bg-background">
      <Navbar />
      <div v-if="!route.path.includes('character')">
        <div class="absolute top-1/3 left-5 w-[200px] h-[630px] max-2xl:hidden">
          <div class="w-full h-full">
            <Adsbygoogle ad-slot="4140966810" />
          </div>
        </div>

        <div
          class="absolute top-1/3 right-5 w-[200px] h-[630px] max-2xl:hidden"
        >
          <div class="w-full h-full">
            <Adsbygoogle ad-slot="4140966810" />
          </div>
        </div>
      </div>

      <main>
        <NuxtPage />
      </main>
    </q-layout>
  </div>
</template>
