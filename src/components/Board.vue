<template>
  <button @click="isGamePlaying = !isGamePlaying" style="font-size: 50px">
    Toggle game state
  </button>
  <div :class="['board', { 'board-disabled': !isGamePlaying }]">
    <div class="row" v-for="(row, rIndex) in board" :key="'row-' + rIndex">
      <span
        class="tile"
        v-for="(tile, tIndex) in row"
        :key="rIndex + '-tile-' + tIndex"
        @drop="onDrop($event, { i: rIndex, j: tIndex })"
        @dragenter.prevent
        @dragover.prevent
      >
        <piece
          v-if="typeof tile === 'object'"
          :alias="tile.alias"
          :team="tile.team"
          :draggable="
            typeof board[rIndex][tIndex] === 'object' &&
            tile.team === turn &&
            isGamePlaying
          "
          :class="[tile?.class, 'piece']"
          style="background-color: transparent"
          @dragstart="onDrag($event, tile, { i: rIndex, j: tIndex })"
          @dragenter.prevent
          @dragover.prevent
        ></piece>
        <span
          :class="{ 'available-move': isAvailableMove(rIndex, tIndex) }"
        ></span>
      </span>
    </div>
    <ImageSelector
      v-if="pawnReplacement.possible"
      team="white"
      v-model="pawnReplacer"
    >
    </ImageSelector>
  </div>
</template>

<script setup>
import Piece from "./Piece.vue";
import ImageSelector from "./ImageSelector.vue";

import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../store/main";

const pawnReplacer = ref("");

const store = useMainStore();

const { isGamePlaying, turn, board, availableMoves, pawnReplacement } =
  storeToRefs(store);
const { dropPiece, dragPiece, replacePawn } = store;

const onDrag = (event, piece, currentIndexes) => {
  dragPiece(event, piece, currentIndexes);
};

const onDrop = (event, dropIndexes) => {
  dropPiece(event, dropIndexes);
};

const isAvailableMove = (rowIndex, columnIndex) => {
  return availableMoves.value.some(
    (move) => move.i === rowIndex && move.j === columnIndex
  );
};

watch(pawnReplacer, (val, oldVal) => {
  replacePawn(val);
});
</script>

<style lang="scss"></style>
