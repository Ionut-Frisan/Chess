<template>
  <div :class="['board', { 'board-disabled': boardDisabled }]">
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
      :team="teamReplace"
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

const teamReplace = computed(() => {
  const { i, j } = pawnReplacement.value.indexes;
  if (!pawnReplacement.value.possible || i === null || i === null)
    return "white";
  return board.value[i][j].team || "white";
});

const boardDisabled = computed(() => {
  return pawnReplacement.value.possible || !isGamePlaying.value;
})
</script>

<style lang="scss"></style>
