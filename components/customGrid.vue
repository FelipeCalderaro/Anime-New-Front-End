<template>
  <div class="my-5 px-2 sm:px-4 xl:px-8 2xl:px-80">
    <div
      class="grid gap-y-5 gap-x-2 sm:gap-5-x 2xl:gap-x-10 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))] justify-start"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
</style>