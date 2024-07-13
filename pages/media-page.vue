<script setup lang="ts">
import { MediaSeason } from '#gql/default';

const { data } = await useAsyncGql({
  operation: 'mediaBySeason',
  variables: {
    season: MediaSeason.SUMMER,
    year: 2024
  }
});


</script>

<template>
  <div class="anuncio">
    <h2>PAGINA 2</h2>
  </div>

</template>

<style scoped>
.anuncio {
  display: flex;
  justify-content: center;

}
</style>