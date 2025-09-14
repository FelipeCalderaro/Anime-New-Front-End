<script setup lang="ts">
import { ref } from "vue";
const drawerOpen = ref(false);
</script>

<template>
  <div class="header">
    <q-toolbar>
      <div
        class="header-content flex flex-row px-2 sm:px-4 xl:px-8 2xl:px-80 h-full w-full"
      >
        <div class="xl:py-3">
          <a href="/temporadas">
            <img
              class="h-8 md:h-6"
              src="../../assets/logo.png"
              alt="AnimeNew Logo"
            />
          </a>
        </div>

        <div class="grow"></div>

        <div
          class="flex flex-row flex-1 md:inline w-full sm:w-96 justify-center"
        >
          <button class="md:hidden" @click="drawerOpen = !drawerOpen">
            <svg
              class="text-neutral-50 ml-auto w-8"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H4C3.44772 6 3 5.55228 3 5ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 19C3 18.4477 3.44772 18 4 18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div class="hidden grow"></div>

        <!-- Desktop button bar, hidden on mobile -->
        <div class="button-bar xl:flex">
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.news')"
            href="https://animenew.com.br"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.animes')"
            href="https://animenew.com.br/noticias/animes"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.mangas')"
            href="https://animenew.com.br/noticias/mangas"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.games')"
            href="https://animenew.com.br/noticias/games"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.cinema')"
            href="https://animenew.com.br/noticias/cinema"
          />
        </div>

        <div
          v-if="drawerOpen"
          class="absolute z-10 text-white right-8 top-24 bg-background p-6 flex flex-col rounded-lg border-primary04 border-[0.5px]"
        >
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.news')"
            href="https://animenew.com.br"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.animes')"
            href="https://animenew.com.br/noticias/animes"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.mangas')"
            href="https://animenew.com.br/noticias/mangas"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.games')"
            href="https://animenew.com.br/noticias/games"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            :label="$t('navbar.cinema')"
            href="https://animenew.com.br/noticias/cinema"
          />
        </div>
      </div>
    </q-toolbar>
  </div>
</template>

<style scoped>
.button-bar {
  align-self: stretch;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  display: flex;
  @apply hidden md:inline-flex;
}

.button {
  text-align: center;
  color: white;
  font-size: 16px;
  word-wrap: normal;
}

.button-navbar {
  transition: height 0.3s ease-in-out, background-color 0.2s ease-in-out;
  background-color: transparent;
}

.button-navbar:hover {
  height: 100%;
  color: #fafafa;
  @apply bg-primary01;
}

.header {
  width: 100%;
  backdrop-filter: blur(16px);
  background-color: rgba(21, 21, 21, 0.7);
  color: #000;
}

.header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #151515, #7e0829, #151515);
}

.header-content {
  width: inherit;
  height: inherit;
  @apply justify-center items-center;
}

.q-toolbar {
  @apply p-0 items-center;
}
</style>
