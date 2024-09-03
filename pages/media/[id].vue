<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="text-white text-4xl pt-32 bg-red-400">{{ route.params.id }}</div>
</template>

<style>
</style>