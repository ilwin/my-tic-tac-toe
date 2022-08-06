export const isWinner = (x, y, value, board, boardSize) => {
  //horizontal winner
  if (
    board.filter(
      (item, i) =>
        i % boardSize === x &&
        item.join("") === Array(boardSize).fill(value).join("")
    ).length > 0
  ) {
    return Array(boardSize)
      .fill(value)
      .map((_, i) => `${x}-${i}`);
  }

  //vertical winner
  if (board.filter((item) => item[y] === value).length === boardSize) {
    return Array(boardSize)
      .fill(value)
      .map((_, i) => `${i}-${y}`);
  }
  //left-right diagonal winner
  if (board.filter((item, i) => item[i] === value).length === boardSize) {
    return Array(boardSize)
      .fill(value)
      .map((_, i) => `${i}-${i}`);
  }

  //right-left diagonal winner
  if (
    board.filter((item, i) => item[boardSize - i - 1] === value).length ===
    boardSize
  ) {
    return Array(boardSize)
      .fill(value)
      .map((_, i) => `${i}-${boardSize - i - 1}`);
  }

  return [];
};
