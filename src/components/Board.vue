<template>
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
  </div>
</template>

<script setup>
import Piece from "./Piece.vue";

import { ref, computed } from "vue";
import { defaultBoard } from "../utils/constants";
import { getAvailableMoves } from "../utils/utils";
import { useSoundManager } from "../composables/soundManager";
import { useGameManager } from "../composables/gameManager";
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
const { changeTurn, isGamePlaying, turn } = useGameManager();

defaultBoard.forEach((row, rIndex) =>
  row.forEach((tile, tIndex) => {
    if (typeof tile === "object") tile.key = rIndex + "-" + tIndex;
  })
);

const board = ref(defaultBoard);
const availableMoves = ref([]);

const onDrag = (event, piece, currentIndexes) => {
  if (!isGamePlaying.value || turn.value !== piece.team) return;
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("piece", JSON.stringify(piece));
  event.dataTransfer.setData("indexes", JSON.stringify(currentIndexes));
  availableMoves.value = getAvailableMoves(piece, currentIndexes, board.value);
};

const onDrop = (event, dropIndexes) => {
  const piece = JSON.parse(event.dataTransfer.getData("piece"));
  const indexes = JSON.parse(event.dataTransfer.getData("indexes"));

  // return if game has not started or is not team's turn
  if (!isGamePlaying.value || turn.value !== piece.team) return;

  if (typeof piece !== "object") return;

  const canDrop = availableMoves.value.some(
    (move) => move.i === dropIndexes.i && move.j === dropIndexes.j
  );

  if (canDrop) {
    const prevBoard = board.value;
    let newBoard = board.value;
    newBoard[dropIndexes.i][dropIndexes.j] = newBoard[indexes.i][indexes.j];
    newBoard[indexes.i][indexes.j] = 0;

    changeTurn({
      pieceMoved: piece,
      prevBoard,
      board: newBoard,
    });

    playSound("move");
    board.value = newBoard;
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
