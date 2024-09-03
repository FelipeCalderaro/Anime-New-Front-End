<script setup lang="ts">
// To use a different layout on a specific page, define the layout property using definePageMeta.
// definePageMeta({
//     layout: "default"
// })
function hijackFilter(url: string) {
  return /^https:\/\/graphql\.anilist\.co/.test(url);
}
</script>

<template>
  <div class="DefaultLayout">
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

      <div class="fixed top-[240px] left-5 w-[200px] h-[630px] max-2xl:hidden">
        <div class="w-full h-full bg-indigo-500">ANUNCIO</div>
      </div>

      <div class="fixed top-[240px] right-5 w-[200px] h-[630px] max-2xl:hidden">
        <div class="w-full h-full bg-indigo-500">ANUNCIO</div>
      </div>

      <main>
        <NuxtPage />
      </main>
    </q-layout>
  </div>
</template>
