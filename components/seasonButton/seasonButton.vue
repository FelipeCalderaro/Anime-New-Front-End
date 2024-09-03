<template>
  <q-btn
    flat
    @click="onClick"
    class="w-[130px] py-1 px-2 text-sm font-normal leading-5 cursor-pointer"
    :class="selected ? 'bg-primary-09' : 'bg-card-component'"
  >
    <div class="flex flex-col items-center">
      <img class="w-7 h-7 mb-1" src="https://via.placeholder.com/28x28" />
      {{ label }}
    </div>
  </q-btn>
</template>

<script setup lang="ts">
interface SeasonButtonProps {
  label: string;
  onClick: any;
  selected: boolean;
}

const props = defineProps<SeasonButtonProps>();
</script>

<style>
</style>