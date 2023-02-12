import { ref } from "vue";

export const useGameManager = () => {
  const turn = ref("white");
  const teams = ["white", "black"];
  const history = ref([]);
  let historyIndex = 0;
  const isGamePlaying = ref(false);
  const gameState = ref('notStarted');

  const changeTurn = (data) => {
    if (!isGamePlaying) return;
    const { board, prevBoard, pieceMoved } = data;
    turn.value = turn.value === "white" ? "black" : "white";
    history.value.push(board);
    historyIndex = history.length - 1;
  };

  const startGame = () => {
    isGamePlaying.value = true;
    gameState.value = 'playing'
  };

  const pauseGame = () => {
    isGamePlaying.value = false;
    gameState.value = 'paused';
  }
  return { changeTurn, isGamePlaying, history, turn, startGame };
};
