<script setup lang="ts">
</script>

<template>
  <q-header elevated class="header font-exo">
    <div class="header-content row">
      <div class="header-logo-container">
        <a href="https://animenew.com.br">
          <img class="header-logo" src="../../assets/logo.png" />
        </a>
      </div>
      <div class="button-bar">
        <q-btn flat class="button font-semibold button-navbar" label="ANIMES"
          href="https://animenew.com.br/noticias/animes/" />
        <q-btn flat class="button font-semibold button-navbar" label="MANGAS"
          href="https://animenew.com.br/noticias/mangas/" />
        <q-btn flat class="button font-semibold button-navbar" label="GAMES"
          href="https://animenew.com.br/noticias/games/#" />
        <q-btn flat class="button font-semibold button-navbar" label="CINEMA"
          href="https://animenew.com.br/noticias/cinema/#" />
        <q-btn flat class="button font-semibold button-navbar" label="LIVE ACTION"
          href="https://animenew.com.br/noticias/live-action/" />
      </div>
    </div>
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
  /* Transição suave para altura e cor */
  background-color: transparent;
  /* Cor padrão do botão */
}

.button-navbar:hover {
  height: 100%;
  /* Preencher altura da navbar */
  background-color: rgba(173, 1, 50, 0.7);
  /* Cor de fundo no hover */
  color: #fafafa;
  /* Cor do texto no hover */
}


.header {
  width: 100%;
  backdrop-filter: blur(16px);
  background-color: rgba(21, 21, 21, 0.7);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 16px;
  color: #000;
}

/* Header bottom border with linear gradient */
.header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  /* Height of the border */
  background: linear-gradient(to right, #151515, #7E0829, #151515);
  /* Gradient colors */
}


.header-content {
  width: inherit;
  height: inherit;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  margin-left: 80px;
  margin-right: 80px;
}


.header-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-logo-container {
  padding-top: 12px;
  padding-bottom: 12px;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  display: flex;
}
</style>