<template>
  <div class="board">
    <div class="row" v-for="(row, rIndex) in board" :key="'row-' + rIndex">
      <span
        class="tile"
        v-for="(tile, tIndex) in row"
        :key="rIndex + '-tile-' + tIndex"
        @drop="onDrop($event, { i: rIndex, j: tIndex })"
        @dragenter.prevent
        @dragover.prevent
      >
        <span
          v-if="typeof tile === 'object'"
          :draggable="typeof board[rIndex][tIndex] === 'object'"
          style="background-color: transparent"
          @dragstart="onDrag($event, tile, { i: rIndex, j: tIndex })"
          @dragenter.prevent
          @dragover.prevent
        >
          <font-awesome-icon
            :icon="tile.icon"
            :style="tile.style"
            :class="[tile?.class, 'piece']"
            fill="none"
          />
        </span>
        <span
          :class="{ 'available-move': isAvailableMove(rIndex, tIndex) }"
        ></span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defaultBoard } from "../utils/constants";
import { getAvailableMoves } from "../utils/utils";
import { useSoundManager } from "../composables/soundManager";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessRook,
  faChessQueen
);

const { playSound } = useSoundManager();

defaultBoard.forEach((row, rIndex) =>
  row.forEach((tile, tIndex) => {
    if (typeof tile === "object") tile.key = rIndex + "-" + tIndex;
  })
);

const board = ref(defaultBoard);
const availableMoves = ref([]);

const onDrag = (event, piece, currentIndexes) => {
  // calculatePossibleMoves(piece);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("piece", JSON.stringify(piece));
  event.dataTransfer.setData("indexes", JSON.stringify(currentIndexes));
  availableMoves.value = getAvailableMoves(piece, currentIndexes, board.value);
};

const onDrop = (event, dropIndexes) => {
  const piece = JSON.parse(event.dataTransfer.getData("piece"));
  const indexes = JSON.parse(event.dataTransfer.getData("indexes"));

  if (typeof piece !== "object") return;

  const canDrop = availableMoves.value.some(
    (move) => move.i === dropIndexes.i && move.j === dropIndexes.j
  );

  if (canDrop) {
    board.value[dropIndexes.i][dropIndexes.j] =
      board.value[indexes.i][indexes.j];
    board.value[indexes.i][indexes.j] = 0;
    playSound("move");
  } else {
    playSound("notAllowed");
    board.value[indexes.i][indexes.j] = {
      ...board.value[indexes.i][indexes.j],
      class: "invalid",
    };
    setTimeout(() => (board.value[indexes.i][indexes.j].class = ""), 300);
  }

  availableMoves.value = [];
};

const isAvailableMove = (rowIndex, columnIndex) => {
  return availableMoves.value.some(
    (move) => move.i === rowIndex && move.j === columnIndex
  );
};
</script>

<style lang="scss"></style>
