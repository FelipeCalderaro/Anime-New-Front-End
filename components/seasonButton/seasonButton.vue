<template>
  <q-btn flat @click="onClick" class="w-[130px] py-1 px-2 text-sm font-normal leading-5 cursor-pointer" :class="selected
    ? 'bg-primary-01'
    : 'bg-card-component hover:bg-gradient-to-t  hover:from-primary-01 hover:to-65% hover:to-ui-component2 transition duration-300 ease-in-out'
    ">
    <div class="flex flex-col items-center">
      <img class="w-7 h-7 mb-1" :src="icon" alt="Season Icon" />
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


import fallIcon from '@/assets/svg/fall-icon.svg';
import winterIcon from '@/assets/svg/winter-icon.svg';
import summerIcon from '@/assets/svg/summer-icon.svg';
import springIcon from '@/assets/svg/spring-icon.svg';

</script>

<style></style>