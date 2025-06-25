<template >
  <div class="error-page bg-background">
    <h1 v-if="error.statusCode === 404">404!</h1>
    <p v-else>{{ error.message }}</p>
    {{ `:(` }}
    <button @click="handleError">Clear error</button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<style scoped>
.spotlight {
  @apply bg-primary01;
}
.error-page {
  text-align: center;
  padding: 50px;
}
</style>