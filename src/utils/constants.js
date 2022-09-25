const whiteTeamConstants = {
  style: {
    color: "#fff",
    stroke: "black",
    "stroke-width": "1em",
  },
  team: "white",
};

const blackTeamConstatns = {
  style: {
    color: "black",
    stroke: "white",
    "stroke-width": "1em",
  },
  team: "black",
};

export const knightW = {
  points: 3,
  alias: "knight",
  icon: "fa fa-chess-knight",
  ...whiteTeamConstants,
};

export const pawnW = {
  points: 1,
  alias: "pawn",
  icon: "fa fa-chess-pawn",
  ...whiteTeamConstants,
};

export const bishopW = {
  points: 3,
  alias: "bishop",
  icon: "fa fa-chess-bishop",
  ...whiteTeamConstants,
};

export const rookW = {
  points: 5,
  alias: "rook",
  icon: "fa fa-chess-rook",
  ...whiteTeamConstants,
};

export const queenW = {
  points: 5,
  alias: "queen",
  icon: "fa fa-chess-queen",
  ...whiteTeamConstants,
};

export const kingW = {
  points: 999,
  alias: "king",
  icon: "fa fa-chess-king",
  ...whiteTeamConstants,
};

export const knightB = {
  points: 3,
  alias: "knight",
  icon: "fa fa-chess-knight",
  ...blackTeamConstatns,
};

export const pawnB = {
  points: 1,
  alias: "pawn",
  icon: "fa fa-chess-pawn",
  ...blackTeamConstatns,
};

export const bishopB = {
  points: 3,
  alias: "bishop",
  icon: "fa fa-chess-bishop",
  ...blackTeamConstatns,
};

export const rookB = {
  points: 5,
  alias: "rook",
  icon: "fa fa-chess-rook",
  ...blackTeamConstatns,
};

export const queenB = {
  points: 5,
  alias: "queen",
  icon: "fa fa-chess-queen",
  ...blackTeamConstatns,
};

export const kingB = {
  points: 999,
  alias: "king",
  icon: "fa fa-chess-king",
  ...blackTeamConstatns,
};

export const pieces = {
  queenW,
  kingW,
  rookW,
  knightW,
  rookW,
  pawnW,
  queenB,
  kingB,
  rookB,
  knightB,
  rookB,
  pawnB,
};

export const defaultBoard = [
  [rookW, knightW, bishopW, queenW, kingW, bishopW, knightW, rookW],
  [pawnW, pawnW, pawnW, pawnW, pawnW, pawnW, pawnW, pawnW],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [pawnB, pawnB, pawnB, pawnB, pawnB, pawnB, pawnB, pawnB],
  [rookB, knightB, bishopB, queenB, kingB, bishopB, knightB, rookB],
];
