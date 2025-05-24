<template>
  <div
    class="px-2 py-2 bg-ui-component rounded-md justify-center items-center flex"
  >
    <div class="text-words text-[10px] font-medium truncate">
      {{ genre }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface ChipProps {
  genre: string;
}

defineProps<ChipProps>();
</script>

<style>
</style>