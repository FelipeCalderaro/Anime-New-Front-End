<template>
  <div
    class="px-3 py-1 bg-primary-10 rounded-md justify-center items-center flex"
  >
    <div class="text-neutral-50 text-[10px] font-medium leading-[13px] py-1">
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