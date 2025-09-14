<template>
  <form @submit.prevent="handleSubmit" class="max-w-md w-[350px] my-1">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      {{ hint }}
    </label>
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        v-model="text"
        @input="onValidation"
        type="search"
        id="default-search"
        class="header-search block w-full p-4 ps-10 text-sm text-white border border-transparent rounded-lg bg-header-background focus:bg-background focus:border-primary-10"
        :class="{ 'border-red-500': error, 'border-transparent': !error }"
        :placeholder="hint"
      />
      <!-- <button
        type="submit"
        class="block xs:hidden sm:block text-white absolute end-2.5 bottom-2.5 bg-background hover:bg-primary-01 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
      >
        {{ $t("search") }}
      </button> -->
    </div>
  </form>
</template>

<style>
</style>

<script setup lang="ts">
import { computed, ref } from "vue";

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
  error.value = isValid ? "" : props.errorMessage;
}

// Function to handle form submission
function handleSubmit() {
  onValidation();
  if (!error.value) {
    props.onSubmit(true, text.value);
  }
}

// Computed property to check if the input is valid
const isTextValid = computed(() => error.value === "" && text.value !== "");
</script>
