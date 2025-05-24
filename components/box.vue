<template>
  <div class="bg-card-component p-4 text-words rounded-md">
    <h4 class="font-bold text-lg">{{ title }}</h4>
    <div class="h-[2px] w-full bg-ui-component my-2" />
    <slot />
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  title: string;
}
const props = defineProps<Props>();
</script>

<style>
</style>