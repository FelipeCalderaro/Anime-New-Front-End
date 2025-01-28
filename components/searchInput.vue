<template>
  <div class="h-10">
    <input
      v-model="text"
      @input="onValidation"
      @keydown.enter="onSubmit(isTextValid, text)"
      :type="type"
      :id="inputId"
      :placeholder="hint"
      class="h-full w-full px-4 py-2 text-white bg-transparent border-2 rounded-lg focus:outline-none focus:ring-white"
      :class="{ 'border-red-500': error, 'border-card-component': !error }"
    />
    <!-- Validation Message -->
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface inputProps {
  validation: (value: string) => boolean;
  onSubmit: (isValid: boolean, text: string) => void;
  errorMessage: string;
  hint: string;
  type: string;
  inputId?: string;
}
const props = defineProps<inputProps>();
const text = ref("");
const error = ref("");

// Function to validate the input
function onValidation() {
  const isValid = props.validation(text.value);
  if (isValid) {
    error.value = "";
  } else {
    error.value = props.errorMessage;
  }
}

// Computed property to check if the input is valid
const isTextValid = computed(() => {
  return error.value === "" && text.value !== "";
});
</script>

<style>
</style>