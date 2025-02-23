<script setup lang="ts">
import { ref } from "vue";
const drawerOpen = ref(false);
</script>

<template>
  <q-header elevated class="header">
    <q-toolbar>
      <div
        class="header-content flex flex-row items-center justify-between mx-3 xl:mx-20 h-full"
      >
        <div class="xl:py-3 xl:gap-3 lg:ml-[246px]">
          <a href="/temporadas">
            <img
              class="xl:gap-3 h-6"
              src="../../assets/logo.png"
              alt="AnimeNew Logo"
            />
          </a>
        </div>

        <!-- Desktop button bar, hidden on mobile -->
        <div class="button-bar xl:flex">
          <q-btn
            flat
            class="button font-semibold button-navbar"
            label="NOTICIAS"
            href="https://animenew.com.br"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            label="ANIMES"
            href="https://animenew.com.br/noticias/animes"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            label="MANGAS"
            href="https://animenew.com.br/noticias/mangas"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            label="GAMES"
            href="https://animenew.com.br/noticias/games"
          />
          <q-btn
            flat
            class="button font-semibold button-navbar"
            label="CINEMA"
            href="https://animenew.com.br/noticias/cinema"
          />
        </div>

        <!-- Mobile menu toggle button, hidden on desktop -->
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="xl:hidden"
          @click="drawerOpen = !drawerOpen"
        />
      </div>
    </q-toolbar>

    <!-- Drawer for mobile menu -->
    <!-- <q-drawer
      v-model="drawerOpen"
      side="right"
      overlay
      behavior="mobile"
      class="bg-gray-900 text-white"
    >
      <div class="flex flex-col space-y-4 p-4">
        <q-btn
          flat
          class="button font-semibold button-navbar"
          label="ANIMES"
          href="https://animenew.com.br/noticias/animes/"
        />
        <q-btn
          flat
          class="button font-semibold button-navbar"
          label="MANGAS"
          href="https://animenew.com.br/noticias/mangas/"
        />
        <q-btn
          flat
          class="button font-semibold button-navbar"
          label="GAMES"
          href="/noticias/games"
        />
        <q-btn
          flat
          class="button font-semibold button-navbar"
          label="CINEMA"
          href="https://animenew.com.br/noticias/cinema/#"
        />
        <q-btn
          flat
          class="button font-semibold button-navbar"
          label="LIVE ACTION"
          href="https://animenew.com.br/noticias/live-action/"
        />
      </div>
    </q-drawer> -->
  </q-header>
</template>

<style scoped>
.button-bar {
  align-self: stretch;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  display: flex;
}

.button {
  text-align: center;
  color: white;
  font-size: 16px;
  word-wrap: normal;
}

.button-navbar {
  transition: height 0.3s ease-in-out, background-color 0.3s ease-in-out;
  background-color: transparent;
}

.button-navbar:hover {
  height: 100%;
  background-color: rgba(173, 1, 50, 0.7);
  color: #fafafa;
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
}
</style>
