<template>
  <div
    class="px-2 py-2 bg-primary-05 rounded-md justify-center items-center flex"
  >
    <div class="text-neutral-50 text-[10px] font-medium truncate">
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