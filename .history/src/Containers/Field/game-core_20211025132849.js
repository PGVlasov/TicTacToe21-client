import { render } from "@testing-library/react";
import _ from "lodash";
//import { Alert } from "react-bootstrap";
import GotWinner from "./GotWinner";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

export function move(step, board, row, column) {
  const newBoard = _.cloneDeep(board);
  newBoard[row][column] = step;

  return newBoard;
}

export function gotWinner(step, params) {
  alert(`${step} is winner`);
  document.location.reload();
}
