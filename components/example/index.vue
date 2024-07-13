<template>
    <div>
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <ul>
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
      <div v-if="user">
        <h3>User Information</h3>
        <p>Name: {{ user.name }}</p>
        <p>Age: {{ user.age }}</p>
      </div>
      <button @click="onClick">Click Me</button>
    </div>
</template>

<script setup lang="ts">
import type { ComplexComponentProps } from "../../types/components/example/example_interface";
import type { User } from "../../types/components/example/example_types";

// Define props with default values using withDefaults
const props = withDefaults(defineProps<ComplexComponentProps>(), {
  message: 'This is a default message',
  // Using a function for defaults (e.g., items: () => []) prevents shared state issues by ensuring each component instance gets a unique array.
  items: () => [] as User[],
  // Use user: undefined to indicate an optional prop's absence; null implies a deliberate lack of value.
  user: undefined,
  handleClick: () => alert('Button clicked!'),
})

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
  props.handleClick?.()
}
</script>

<style scoped>
h2 {
  color: blue;
}
h3 {
  color: green;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
button:hover {
  background-color: #2c3e50;
}
</style>
