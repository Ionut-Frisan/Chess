import { ref, onMounted } from "vue";

export const useGameManager = () => {
  const turn = ref("white");
  const teams = ["white", "black"];
  const history = ref([]);
  let historyIndex = 0;
  const isGamePlaying = ref(false);

  const changeTurn = (data) => {
    if (!isGamePlaying) return;
    const { board, prevBoard, pieceMoved } = data;
    turn.value = turn.value === "white" ? "black" : "white";
    history.value.push(board);
    historyIndex = history.length - 1;
  };

  const startGame = () => {
    isGamePlaying.value = true;
  };
  return { changeTurn, isGamePlaying, history, turn, startGame };
};
