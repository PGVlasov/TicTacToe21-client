export function checkWinner(board, lastMove) {
  const winnerCellNumber = 5;
  //const boardSize = 9;
  const lastRow = lastMove.x;
  const lastColumn = lastMove.y;
  const step = lastMove.type;
  return (
    checkWinnerLeftToRight(
      step,
      board,
      winnerCellNumber,
      lastRow,
      lastColumn
    ) ||
    checkWinnerTopToBottom(
      step,
      board,
      winnerCellNumber,
      lastRow,
      lastColumn
    ) ||
    checkWinnerLeftBottomRightTop(
      step,
      board,
      winnerCellNumber,
      lastRow,
      lastColumn
    ) ||
    checkWinnerLeftTopRightBottom(
      step,
      board,
      winnerCellNumber,
      lastRow,
      lastColumn
    )
  );
}

export function checkWinnerLeftToRight(
  step,
  board,
  winnerCellNumber,
  lastRow,
  lastColumn
) {
  const leftBorder =
    lastColumn - winnerCellNumber < 0 ? 0 : lastColumn - winnerCellNumber + 1;

  const rightBorder =
    lastColumn + winnerCellNumber > board.length - 1
      ? board.length - 1
      : lastColumn + winnerCellNumber - 1;

  const row = board[lastRow];
  let numberOfSameCells = 0;
  let isWinner = false;

  for (let i = leftBorder; i <= rightBorder; i++) {
    if (row[i] === step) {
      numberOfSameCells += 1;
    } else {
      numberOfSameCells = 0;
    }
    if (numberOfSameCells === winnerCellNumber) {
      isWinner = true;
      break;
    }
  }

  return isWinner;
}

export function checkWinnerTopToBottom(
  step,
  board,
  winnerCellNumber,
  lastRow,
  lastColumn
) {
  const topBorder =
    lastRow - winnerCellNumber < 0 ? 0 : lastRow - winnerCellNumber + 1;
  const buttomBorder =
    lastRow + winnerCellNumber > board.length - 1
      ? board.length - 1
      : lastRow + winnerCellNumber - 1;

  let arr = [];
  let isWinner = false;
  for (let i = 0; i < board.length; i++) {
    arr.push(board[i][lastColumn]);
  }
  let col = Array.from(arr);
  let numberOfSameCellTop = 0;
  for (let k = topBorder; k <= buttomBorder; k++) {
    if (col[k] === step) {
      numberOfSameCellTop += 1;
    } else {
      numberOfSameCellTop = 0;
    }
    if (numberOfSameCellTop === winnerCellNumber) {
      isWinner = true;
      break;
    }
  }

  return isWinner;
}

export function checkWinnerLeftBottomRightTop(
  step,
  board,
  winnerCellNumber,
  lastRow,
  lastColumn
) {
  let xStart = lastColumn - winnerCellNumber + 1;
  let yStart = lastRow + winnerCellNumber - 1;
  if (yStart > 9) {
    let helper = yStart - 9;
    xStart = xStart + helper;
    yStart = 9;
  }

  let isWinner = false;
  let numInRow = 0;
  //   console.log(numInRow);

  try {
    for (let i = 0; i < 10; i++) {
      let xSt = xStart + i;
      let ySt = yStart - i;

      const currentCell = board[ySt][xSt];

      if (currentCell === step) {
        numInRow += 1;
      } else {
        numInRow = 0;
      }

      if (numInRow === winnerCellNumber) {
        isWinner = true;
        break;
      }
    }
  } catch (e) {}

  return isWinner;
}

export function checkWinnerLeftTopRightBottom(
  step,
  board,
  winnerCellNumber,
  lastRow,
  lastColumn
) {
  let xStart = lastColumn - winnerCellNumber + 1;
  let yStart = lastRow - winnerCellNumber + 1;
  if (yStart < 0) {
    xStart = xStart + Math.abs(yStart);
    yStart = 0;
  }

  let isWinner = false;
  let numInRow = 0;
  try {
    for (let i = 0; i < 10; i++) {
      let xSt = xStart + i;
      let ySt = yStart + i;

      const currentCell = board[ySt][xSt];

      if (currentCell === step) {
        numInRow += 1;
      } else {
        numInRow = 0;
      }

      if (numInRow === winnerCellNumber) {
        isWinner = true;
        break;
      }
    }
  } catch (e) {
    // console.log(e);
  }
  return isWinner;
}
