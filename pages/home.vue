<script setup lang="ts">
import type { Posts } from '~/types/pages/home/posts';

const user = await useStrapiAuth().login({
    identifier: 'AdeptusLupus',
    password: '***'
});
const strapi = useStrapi4()
const posts = await strapi.find<Posts>('posts', {
    populate: 'Banner',
    sort: "createdAt:desc",
})

const content = ref<HTMLDivElement|null>(null);
onMounted(()=>{
    if (content.value) {
        const listItems = content.value.querySelectorAll<HTMLLIElement>('ul');
        listItems.forEach(item => {
            item.classList.add('list-disc'); // Add Tailwind's list-disc class dynamically
        });
    } 
}) 

</script>

<template>
    <div class="bg-slate-950 text-white px-96">
        <!-- <div style="height: 100px"></div> -->
        <div class="grid grid-cols-3 gap-6">
            <div 
                :class="index === 0 ? 'col-span-3 row-span-2' : 'col-span-1'" 
                v-for="(post, index) in posts.data" 
                :key="post.id"
            >
                <div id="image-card" class="relative w-full aspect-video font-exo">
                    <img :src="'http://localhost:1337' + post.attributes.Banner.data.attributes.url" alt="Sample Image" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-8 text-white">
                        <h3 class="text-wrap text-lg">{{ post.attributes.Title }}</h3>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>


<style>
.main-content a {
    color: red;
}

</style>