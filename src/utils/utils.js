export const getAvailableMoves = (piece, indexes, board) => {
  const moveMapping = {
    pawn: getPawnMoves,
    rook: getRookMoves,
    bishop: getBishopMoves,
    queen: getQueenMoves,
    king: getKingMoves,
    knight: getKnightMoves,
  };
  return moveMapping[piece.alias](piece, indexes, board) || [];
};

const getPawnMoves = (piece, indexes, board) => {
  const moveBlack = (indexes, rows) => ({ i: indexes.i - rows, j: indexes.j });
  const moveWhite = (indexes, rows) => ({ i: indexes.i + rows, j: indexes.j });
  const attackBlack = (indexes, y) =>
    y === "left"
      ? { i: indexes.i - 1, j: indexes.j - 1 }
      : { i: indexes.i - 1, j: indexes.j + 1 };
  const attackWhite = (indexes, y) =>
    y === "left"
      ? { i: indexes.i + 1, j: indexes.j - 1 }
      : { i: indexes.i + 1, j: indexes.j + 1 };

  const checkMoves = (piece, indexes, board) => {
    let movesArr = [];
    if (piece.team === "white") {
      // pawn can move 2 squared ahead if it's first move for that pawn
      if (indexes.i === 1) {
        movesArr.push(moveWhite(indexes, 2));
      }
      if (
        indexes.i !== 7 &&
        typeof board[indexes.i + 1][indexes.j] !== "object"
      )
        movesArr.push(moveWhite(indexes, 1));

      if (
        indexes.j !== 7 &&
        indexes.i !== 7 &&
        typeof board[indexes.i + 1][indexes.j + 1] === "object" &&
        board[indexes.i + 1][indexes.j + 1].team === "black"
      ) {
        movesArr.push(attackWhite(indexes, "right"));
      }
      if (
        indexes.j !== 0 &&
        indexes.i !== 7 &&
        typeof board[indexes.i + 1][indexes.j - 1] === "object" &&
        board[indexes.i + 1][indexes.j - 1].team === "black"
      ) {
        movesArr.push(attackWhite(indexes, "left"));
      }
    } else {
      // pawn can move 2 squared ahead if it's first move for that pawn
      if (indexes.i === 6) {
        movesArr.push(moveBlack(indexes, 2));
      }
      if (
        indexes.i !== 0 &&
        typeof board[indexes.i - 1][indexes.j] !== "object"
      )
        movesArr.push(moveBlack(indexes, 1));

      if (
        indexes.j !== 7 &&
        indexes.i !== 0 &&
        typeof board[indexes.i - 1][indexes.j + 1] === "object" &&
        board[indexes.i - 1][indexes.j + 1].team === "white"
      ) {
        movesArr.push(attackBlack(indexes, "right"));
      }
      if (
        indexes.j !== 0 &&
        indexes.i !== 0 &&
        typeof board[indexes.i - 1][indexes.j - 1] === "object" &&
        board[indexes.i - 1][indexes.j - 1].team === "white"
      ) {
        movesArr.push(attackBlack(indexes, "left"));
      }
    }
    return movesArr;
  };
  return checkMoves(piece, indexes, board);
};

const getRookMoves = (piece, indexes, board, maxI, minI, maxJ, minJ) => {
  const movesArr = [];
  // check moves above
  for (let i = indexes.i + 1; i < (maxI || 8); i++) {
    if (typeof board[i][indexes.j] === "object") {
      if (board[i][indexes.j].team !== piece.team) {
        movesArr.push({ i, j: indexes.j });
      }
      break;
    }
    movesArr.push({ i, j: indexes.j });
  }
  // check moves below
  for (let i = indexes.i - 1; i >= (minI || 0); i--) {
    if (typeof board[i][indexes.j] === "object") {
      if (board[i][indexes.j].team !== piece.team) {
        movesArr.push({ i, j: indexes.j });
      }
      break;
    }
    movesArr.push({ i, j: indexes.j });
  }
  // check moves right
  for (let j = indexes.j + 1; j < (maxJ || 8); j++) {
    if (typeof board[indexes.i][j] === "object") {
      if (board[indexes.i][j].team !== piece.team) {
        movesArr.push({ i: indexes.i, j });
      }
      break;
    }
    movesArr.push({ i: indexes.i, j });
  }
  // check moves left
  for (let j = indexes.j - 1; j >= (minJ || 0); j--) {
    if (typeof board[indexes.i][j] === "object") {
      if (board[indexes.i][j].team !== piece.team) {
        movesArr.push({ i: indexes.i, j });
      }
      break;
    }
    movesArr.push({ i: indexes.i, j });
  }
  return movesArr;
};

const getBishopMoves = (piece, indexes, board, maxI, minI, maxJ, minJ) => {
  let movesArr = [];
  let i = indexes.i + 1;
  let j = indexes.j + 1;
  while (i < (maxI || 8) && j < (maxJ || 8)) {
    if (typeof board[i][j] === "object") {
      if (board[i][j].team !== piece.team) {
        movesArr.push({ i, j });
      }
      break;
    }
    movesArr.push({ i, j });
    i++;
    j++;
  }

  i = indexes.i + 1;
  j = indexes.j - 1;
  while (i < (maxI || 8) && j >= (minJ || 0)) {
    if (typeof board[i][j] === "object") {
      if (board[i][j].team !== piece.team) {
        movesArr.push({ i, j });
      }
      break;
    }
    movesArr.push({ i, j });
    i++;
    j--;
  }

  i = indexes.i - 1;
  j = indexes.j + 1;
  while (i >= (minI || 0) && j < (maxJ || 8)) {
    if (typeof board[i][j] === "object") {
      if (board[i][j].team !== piece.team) {
        movesArr.push({ i, j });
      }
      break;
    }
    movesArr.push({ i, j });
    i--;
    j++;
  }

  i = indexes.i - 1;
  j = indexes.j - 1;
  while (i >= (minI || 0) && j >= (minJ || 0)) {
    if (typeof board[i][j] === "object") {
      if (board[i][j].team !== piece.team) {
        movesArr.push({ i, j });
      }
      break;
    }
    movesArr.push({ i, j });
    i--;
    j--;
  }
  return movesArr;
};

const getQueenMoves = (piece, indexes, board) => {
  let movesArr = getBishopMoves(piece, indexes, board);
  return movesArr.concat(getRookMoves(piece, indexes, board));
};

const getKingMoves = (piece, indexes, board) => {
  const minI = indexes.i <= 1 ? 0 : indexes.i - 1;
  const minJ = indexes.j <= 1 ? 0 : indexes.j - 1;
  const maxI = indexes.i == 7 ? 8 : indexes.i + 2;
  const maxJ = indexes.j == 7 ? 8 : indexes.j + 2;
  const movesArr = getBishopMoves(
    piece,
    indexes,
    board,
    maxI,
    minI,
    maxJ,
    minJ
  );
  return movesArr.concat(
    getRookMoves(piece, indexes, board, maxI, minI, maxJ, minJ)
  );
};

const getKnightMoves = (piece, indexes, board) => {
  let movesArr = [];

  const checkMove = (piece, indexes, board, i, j) => {
    if (!(i >= 0 && i <= 7 && j >= 0 && j <= 7)) return;
    if (typeof board[i][j] === "object") {
      if (board[i][j].team !== piece.team) {
        movesArr.push({ i, j });
      }
    } else {
      movesArr.push({ i, j });
    }
  };

  const allPossibleMoves = [
    { i: indexes.i + 2, j: indexes.j + 1 },
    { i: indexes.i + 2, j: indexes.j - 1 },
    { i: indexes.i - 2, j: indexes.j + 1 },
    { i: indexes.i - 2, j: indexes.j - 1 },
    { i: indexes.i - 1, j: indexes.j + 2 },
    { i: indexes.i + 1, j: indexes.j + 2 },
    { i: indexes.i - 1, j: indexes.j - 2 },
    { i: indexes.i + 1, j: indexes.j - 2 },
  ];
  for (const { i, j } of allPossibleMoves) {
    checkMove(piece, indexes, board, i, j);
  }
  return movesArr;
};

export const checkPawnReplace = (piece, board, indexes) => {
  if (piece.alias !== "pawn") return false;
  if (piece.team === "white" && indexes.i === 7) return true;
  if (piece.team === "black" && indexes.i === 0) return true;
  return false;
};
