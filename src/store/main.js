import { defineStore } from "pinia";
import { defaultBoard } from "../utils/constants";
import { useSoundManager } from "../composables/soundManager";
import {
  getAvailableMoves,
  checkPawnReplace,
  isCheckMate,
} from "../utils/utils";

const soundManager = useSoundManager();
// const { playSound } = soundManager;

defaultBoard.forEach((row, rIndex) =>
  row.forEach((tile, tIndex) => {
    if (typeof tile === "object") tile.key = rIndex + "-" + tIndex;
  })
);

export const useMainStore = defineStore("main", {
  state: () => ({
    isGamePlaying: false,
    gameState: 'notStarted',
    turn: "white",
    teams: ["white", "black"],
    historyIndex: 0,
    history: [],
    removedPieces: [],
    board: defaultBoard,
    availableMoves: [],
    pawnReplacement: {
      possible: false,
      indexes: { i: null, j: null },
    },
    winner: "",
  }),
  actions: {
    changeTurn(data) {
      if (!this.isGamePlaying) return;
      const { prevBoard, pieceMoved } = data;
      this.turn = this.turn === "white" ? "black" : "white";
      this.history.push(prevBoard);
      this.historyIndex = this.history.length - 1;
    },
    startGame() {
      this.isGamePlaying = true;
      this.gameState = 'playing';
    },
    pauseGame() {
      this.isGamePlaying = false;
      this.gameState = 'paused';
    },
    removePiece({ i, j }, board) {
      if (typeof board[i][j] === "object") {
        this.removedPieces.push(this.board[i][j]);
      }
    },
    dropPiece(event, dropIndexes) {
      const piece = JSON.parse(event.dataTransfer.getData("piece"));
      const indexes = JSON.parse(event.dataTransfer.getData("indexes"));

      // return if game has not started or is not team's turn
      if (!this.isGamePlaying || this.turn !== piece.team) return;

      if (typeof piece !== "object") return;

      const canDrop = this.availableMoves.some(
        (move) => move.i === dropIndexes.i && move.j === dropIndexes.j
      );

      if (canDrop) {
        const prevBoard = this.board;
        this.removePiece(dropIndexes, prevBoard);
        this.changeTurn({
          pieceMoved: piece,
          prevBoard,
        });

        let newBoard = this.board;
        newBoard[dropIndexes.i][dropIndexes.j] = newBoard[indexes.i][indexes.j];
        newBoard[indexes.i][indexes.j] = 0;

        soundManager.playSound("move");

        this.board = newBoard;
        const canPawnBeReplaced = checkPawnReplace(
          piece,
          this.board,
          dropIndexes
        );
        if (canPawnBeReplaced) {
          // this.isGamePlaying = false;
          this.pawnReplacement = {
            possible: true,
            indexes: {
              i: dropIndexes.i,
              j: dropIndexes.j,
            },
          };
        }
        const team = this.turn === "white" ? "black" : "white";
        isCheckMate(this.board, team, this.turn);
      } else {
        soundManager.playSound("notAllowed");
        this.board[indexes.i][indexes.j] = {
          ...this.board[indexes.i][indexes.j],
          class: "invalid",
        };
        setTimeout(() => (this.board[indexes.i][indexes.j].class = ""), 300);
      }

      this.availableMoves = [];
    },
    dragPiece(event, piece, currentIndexes) {
      if (!this.isGamePlaying || this.turn !== piece.team) return;
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("piece", JSON.stringify(piece));
      event.dataTransfer.setData("indexes", JSON.stringify(currentIndexes));
      this.availableMoves = getAvailableMoves(
        piece,
        currentIndexes,
        this.board
      );
    },
    replacePawn(newAlias) {
      const { i, j } = this.pawnReplacement.indexes;
      this.board[i][j] = { ...this.board[i][j], alias: newAlias };
      this.pawnReplacement = {
        possible: false,
        indexes: {
          i: null,
          j: null,
        },
      };
      // this.isGamePlaying = true;
    },
  },
});
