<template>
  <div
    class="bg-card-component rounded-md overflow-hidden w-[180px] shadow-md cursor-pointer transition hover:scale-105"
    @click="handleClick"
  >
    <!-- Image -->
    <img :src="imageUrl" :alt="title" class="w-full h-64 object-cover" />

    <!-- Info -->
    <div class="p-3">
      <h3 class="text-white text-sm font-semibold truncate" :alt="title">
        {{ title }}
      </h3>
      <p class="text-gray-400 text-xs truncate">{{ studio }}</p>

      <!-- Score + Type -->
      <div class="flex items-center justify-between mt-2">
        <span :class="scoreClass" class="text-xs font-semibold">
          {{ averageScore }}%
        </span>
        <span class="text-xs text-white bg-ui-component px-2 py-0.5 rounded">
          {{ type }}
        </span>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
const localePath = useLocalePath();

const props = defineProps<{
  id: number;
  imageUrl: string;
  title: string;
  studio: string;
  type: string;
  averageScore: number;
  synopsis?: string;
}>();

const handleClick = async () => {
  await navigateTo(localePath(`/media/${props.id}/${slugify(props.title)}`));
};

// Dynamic score color
const scoreClass = computed(() => {
  if (props.averageScore > 80) return "text-green-500";
  if (props.averageScore > 70) return "text-orange-400";
  if (props.averageScore > 50) return "text-red-500";
  return "text-purple-500";
});
</script>
  