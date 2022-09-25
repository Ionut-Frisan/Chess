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
  } else {
    console.log(board.value[indexes.i][indexes.j]);
    board.value[indexes.i][indexes.j].class = "invalid";
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

<style lang="scss">
.board {
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.piece {
  height: 90%;
}

.tile {
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
}

.row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.invalid {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

.available-move {
  background-color: rgba(255, 136, 0, 0.5);
  width: 50%;
  height: 50%;
  display: block;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 25%;
}

.row:nth-child(odd) {
  .tile {
    aspect-ratio: 1;
    width: 100%;
  }
  .tile:nth-child(even) {
    background-color: #009970;
  }
  .tile:nth-child(odd) {
    background-color: #d9dedd;
  }
}

.row:nth-child(even) {
  .tile {
    aspect-ratio: 1;
    width: 100%;
  }
  .tile:nth-child(odd) {
    background-color: #009970;
  }
  .tile:nth-child(even) {
    background-color: #d9dedd;
  }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-2deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(2deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(2deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-2deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-2deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(2deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-2deg);
  }
}
</style>
