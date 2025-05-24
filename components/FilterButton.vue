<template>
  <button
    @click="$emit('click')"
    class="px-3 py-1 rounded-md font-medium text-sm transition-all"
    :class="{
      'bg-primary-01 text-white': active,
      'bg-ui-component text-gray-300 hover:bg-gray-700': !active,
    }"
  >
    {{ label }}
  </button>
</template>
  
  <script setup lang="ts">
defineProps<{
  label: string;
  active: boolean;
}>();

defineEmits(["click"]);
</script>
  