import _ from "lodash";

export function move(step, board, row, column) {
  const newBoard = _.cloneDeep(board);
  newBoard[row][column] = step;

  return newBoard;
}

export function gotWinner(step, params) {
  alert(`${step} is winner`);
  document.location.reload();
}
