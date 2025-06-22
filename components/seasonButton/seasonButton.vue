<template>
  <q-btn
    flat
    @click="onClick"
    class="w-[130px] py-1 px-2 text-sm font-normal leading-5 cursor-pointer hover:-translate-y-3 transition delay-150 duration-300 ease-in-out"
    :class="
      selected
        ? 'bg-primary01'
        : 'bg-cardComponent hover:bg-gradient-to-t  hover:from-primary01 hover:to-65% hover:to-uiComponent2 transition duration-300 ease-in-out'
    "
  >
    <div class="flex flex-col items-center">
      <img class="w-7 h-7 mb-1" :src="icon" :alt="label.toLowerCase()" />
      {{ label }}
    </div>
  </q-btn>
</template>

<script setup lang="ts">
interface SeasonButtonProps {
  label: string;
  onClick: any;
  selected: boolean;
  icon: string;
}

const props = defineProps<SeasonButtonProps>();
</script>

<style></style>