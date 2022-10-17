<template>
  <div class="content">
    <div class="title">Chess by Ionut Frisan</div>
    <div class="game-content">
      <!-- TODO: needs better styling -->
      <div class="removed-pieces">
        <piece
          v-for="piece in removedWhite"
          :alias="piece.alias"
          :team="piece.team"
        ></piece>
      </div>
      <board></board>
      <div class="removed-pieces">
        <piece
          v-for="piece in removedBlack"
          :alias="piece.alias"
          :team="piece.team"
        ></piece>
      </div>
    </div>
  </div>
</template>
<script setup>
import Board from "./Board.vue";
import Piece from "./Piece.vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useMainStore } from "../store/main";

const store = useMainStore();
const { removedPieces, turn } = storeToRefs(store);
const removedWhite = computed(() =>
  removedPieces.value.filter((piece) => piece.team === "white")
);

const removedBlack = computed(() =>
  removedPieces.value.filter((piece) => piece.team === "black")
);
</script>
<style></style>
