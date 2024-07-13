<script setup lang="ts">
// To use a different layout on a specific page, define the layout property using definePageMeta.
// definePageMeta({
//     layout: "default"
// })
</script>

<template>
    <div class="DefaultLayout">
        <!-- Component import example -->
        <!-- <Example title="Example title" message="This is an example usage message"
            :on-click="() => console.log('Example Click')" /> -->

        <Navbar />
        <main>
            <NuxtPage />
        </main>
    </div>
</template>
