<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-cardComponent p-4 rounded-md flex flex-wrap items-center gap-4 place-content-between"
  >
    <!-- Search -->
    <div class="relative flex-grow w-full">
      <div
        class="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-white"
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
        type="text"
        :placeholder="hint"
        class="w-full px-4 py-2 ps-10 rounded-md bg-uiComponent text-white placeholder-gray-400 border transition-all focus:outline-none focus:ring-2 focus:ring-primary01"
        :class="{ 'border-red-500': error, 'border-transparent': !error }"
      />
    </div>

    <!-- <div class="grow-0 2xl:grow"></div> -->

    <!-- Format Filters -->
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-white font-medium">{{ $t("media.format") }}:</span>
      <FilterButton
        v-for="fmt in formats"
        :key="fmt"
        :label="translateMediaFormat(fmt)"
        :active="selectedFormat === fmt"
        @click="props.onFormatSelected(fmt)"
      />
    </div>

    <div class="grow-0 2xl:grow"></div>
    <!-- Status Filters -->
    <!-- <div class="flex items-center gap-2 flex-wrap">
      <span class="text-white font-medium">{{ $t("media.status") }}:</span>
      <FilterButton
        v-for="stat in statuses"
        :key="stat"
        :label="translateMediaStatus(stat)"
        :active="selectedStatus === stat"
        @click="props.onStatusSelected(stat)"
      />
    </div> -->
  </form>
</template>
  
<script setup lang="ts">
import { MediaFormat, MediaStatus } from "#gql/default";
import { All, type Format, type Status } from "~/types/Enums";

const text = ref("");
const error = ref("");

const formats: Format[] = [
  All.ALL,
  MediaFormat.TV,
  MediaFormat.MOVIE,
  MediaFormat.SPECIAL,
  All.OTHER,
];
const statuses: Status[] = [
  All.ALL,
  MediaStatus.RELEASING,
  MediaStatus.FINISHED,
  MediaStatus.NOT_YET_RELEASED,
];

// Props
interface Props {
  validation: (value: string) => boolean;
  onSubmit: (isValid: boolean, text: string) => void;
  errorMessage: string;
  hint: string;
  selectedFormat: Format;
  selectedStatus: Status;
  onFormatSelected: (selection: Format) => void;
  onStatusSelected: (selection: Status) => void;
}
const props = defineProps<Props>();

function onValidation() {
  const isValid = props.validation(text.value);
  error.value = isValid ? "" : props.errorMessage;
}

function handleSubmit() {
  onValidation();
  if (!error.value) {
    props.onSubmit(true, text.value);
  }
}
</script>
  