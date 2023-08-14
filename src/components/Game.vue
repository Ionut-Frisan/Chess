<template>
  <div class="content">
    <div class="game-content">
      <!-- TODO: needs better styling -->
      <div class="removed-pieces">
        <div class="removed-piece" v-for="piece in removedBlack">
          <piece
              :alias="piece.alias"
              :team="piece.team"
          ></piece>
        </div>
      </div>
      <board></board>
      <div class="removed-pieces">
        <div class="removed-piece" v-for="piece in removedWhite">
          <piece
              :alias="piece.alias"
              :team="piece.team"
          ></piece>
        </div>
      </div>
    </div>
    <game-menu/>
  </div>
</template>
<script setup>
import Board from "./Board.vue";
import Piece from "./Piece.vue";
import GameMenu from "./GameMenu.vue";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import {useMainStore} from "../store/main";

const store = useMainStore();
const {removedPieces, turn} = storeToRefs(store);
const removedWhite = computed(() =>
    removedPieces.value.filter((piece) => piece.team === "white")
);

const removedBlack = computed(() =>
    removedPieces.value.filter((piece) => piece.team === "black")
);
</script>
<style></style>
