<template>
  <div class="flex justify-between gap-8">
    <span class="text-labels">{{ label }}:</span>
    <span
      :class="['text-left min-w-[120px]', score ? getScoreColor(value) : '']"
      >{{ value ?? "-" }}</span
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  value: string;
  score?: boolean;
}
const props = defineProps<Props>();

// Score color logic
const getScoreColor = (value: string) => {
  const score = parseInt(value.replace("%", ""));

  if (score > 80) return "text-green-500";
  if (score > 70) return "text-orange-400";
  if (score > 50) return "text-red-500";
  return "text-purple-400";
};
</script>
