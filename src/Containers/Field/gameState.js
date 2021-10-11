import { makeAutoObservable } from "mobx";
import _ from "lodash";

class GameState {
  board = null;

  userName = "";
  socket = null;
  sessionId = null;

  constructor() {
    makeAutoObservable(this);
  }

  setBoard(board) {
    this.board = board;
  }

  setuserName(userName) {
    this.userName = userName;
  }
  setSessionId(id) {
    this.sessionId = id;
  }
  setSocket(socket) {
    this.socket = socket;
  }

  moveHandler() {
    this.socket.send(
      JSON.stringify({
        method: "move",
        id: this.id,
        board: this.newBoard,
      })
    );
  }

  static move(step, board, row, column) {
    const newBoard = _.cloneDeep(board);
    newBoard[row][column] = step;
  }
}

export default new GameState();
