<template>
  <iframe
    :src="`https://www.youtube.com/embed/${id}`"
    :title="title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  title: string;
}
const props = defineProps<Props>();
</script>

<style>
</style>