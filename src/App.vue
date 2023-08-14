<template>
  <game />
</template>

<script setup>
import Game from "./components/Game.vue";
import "./main.scss";
import "./assets/styles/menu.scss";

// TODO: better aproach?
let resizeTimer;

window.addEventListener("resize", () => {
  document.body.classList.add('no-animations');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('no-animations');
  }, 100);
})
</script>

<style scoped></style>
