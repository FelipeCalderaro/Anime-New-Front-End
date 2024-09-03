<script setup lang="ts">
import { MediaSeason, MediaFormat, MediaSort } from "#gql/default";
const trendingBySeasonData = await useAsyncGql({
    operation: 'trendingBySeason',
    variables: {
        season: MediaSeason.SUMMER,
        year: new Date().getFullYear(),
        format: MediaFormat.TV,
        page: 1,
        sort: [MediaSort.POPULARITY_DESC, MediaSort.SCORE_DESC],
    }
})

let trendingMedias = [
    trendingBySeasonData.data.value.Fall?.media?.at(0),
    trendingBySeasonData.data.value.Summer?.media?.at(0),
    trendingBySeasonData.data.value.Winter?.media?.at(0),
    trendingBySeasonData.data.value.Spring?.media?.at(0),
];

let slide = useState();
let autoplay = useState<boolean>(() => true);

</script>

<template>

    <div>
        <q-carousel
            animated
            v-model="slide" 
            navigation
            infinite
            :autoplay="autoplay"
            arrows
            transition-prev="slide-right"
            transition-next="slide-left"
            :padding="false"
            class="bg-background p-0 m-0 h-[540px] lg:h-[420px]"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
        >
            <template v-slot:navigation-icon="{active, btnProps, onClick}">
                <q-btn v-if="active" class="text-primary-09" size="5px" :icon="btnProps.icon" flat round dense @click="onClick"></q-btn>
                <q-btn v-else class="text-primary-10" size="5px" :icon="btnProps.icon"  flat round dense @click="onClick"></q-btn>
            </template>

            <q-carousel-slide
                v-for="(media, index) in trendingMedias" 
                :key="index" 
                :name="index"
            >
                <q-img 
                    fit="cover"
                    style="height: inherit; width: inherit;" 
                    class="p-0" 
                    :src="media?.bannerImage ?? 'https://picsum.photos/200'" 
                >
                    <div id="banner-content" class="flex absolute-full no-bg-color">
                        <div class="absolute-full bg-gradient-to-r from-background via-background-55 via-20%">
                            <div class="m-2 lg:ml-60 text-white w-full lg:w-[700px] h-[264px] mt-[200px] lg:mt-[110px]">
                                <h2 class="text-neutral-50 text-2xl font-bold">{{ media?.title?.english }}</h2>
                                <p class="text-full-white text-base font-medium mb-3">Top 1 {{ media?.season }}</p>
                                <div class="h-1/6 justify-start items-center gap-2 inline-flex wrap"> 
                                    <div 
                                        class="px-3 py-1 bg-primary-10 rounded-md justify-center items-center flex"
                                        v-for="genre in media?.genres?.slice(0, 4)"
                                        :key="'genre-' + genre"
                                    >
                                        <div class="text-neutral-50 text-[10px] font-medium leading-[14px] py-1">{{ genre }}</div>
                                    </div>
                                </div>
                                
                                <div class="mr-4 overflow-y-scroll text-wrap text-xs h-[100px] font-normal leading-[18px] text-neutral-04 my-4 bg-card-component rounded-md bg-opacity-45 p-3" v-html="media?.description"></div>
                                <q-btn no-caps label="Saiba mais" class="w-[300px] bg-primary-09 text-white rounded-lg px-4 py-2" @click="console.log(media?.id)" />    
                            </div>
                        </div>
                    </div>                
                </q-img>
            </q-carousel-slide>
        </q-carousel>
    </div>


</template>

<style>
.q-img__content > .no-bg-color {
    background-color: transparent !important;
    /* @apply bg-gradient-to-r from-indigo-800 via-transparent; */
    @apply bg-gradient-to-t from-background from-0% via-background-55 via-25%;
}

.q-carousel__slide, .q-carousel .q-carousel--padding {
    padding: 0px;
}

/* Padding for navigation dots */
.q-carousel__navigation--bottom {
  transform: translateY(70%);
}

.q-carousel__navigation .q-btn{
    margin-left: 1px;
    margin-right: 1px;
    padding: 0px;
}

</style>