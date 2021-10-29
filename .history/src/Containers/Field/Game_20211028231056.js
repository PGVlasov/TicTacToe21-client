import React from "react";
import { useEffect, useState } from "react";
import "./Field1.css";
import GameParticipants from "./GameParticipants";
import { useParams } from "react-router-dom";
import * as ws from "./websocket";
import { move, gotWinner } from "./game-core";
import { checkWinner } from "./checkWinner.js";

function getIsSecondary() {
  return false;
}

const Game = () => {
  const isSecondary = getIsSecondary();
  function generateInitialBoard() {
    const rows = [];

    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let i = 0; i < 10; i++) {
        row.push(null);
      }

      rows.push(row);
    }

    return rows;
  }

  const [board, setBoard] = useState(generateInitialBoard());
  const [step, setStep] = useState("X");
  const [isMoveAvaible, setMoveAvaible] = useState(true);
  // eslint-disable-next-line
  const [enemyId, setEnemyId] = useState();

  const params = useParams();

  useEffect(() => {
    ws.connect(params.id, isSecondary, (event) => {
      console.log("ws msg:", event.data);
      let msg = JSON.parse(event.data);

      switch (msg.type) {
        case "PLAYER_MOVE":
          onOtherPlayerMove(msg.payload, board);
          break;

        case "CONNECTED":
          onConnection(msg.payload);
          break;
        default:
          break;
      }
    });
    // eslint-disable-next-line
  }, []);

  const onConnection = (clientId) => {
    setEnemyId(clientId);
    localStorage.setItem("EnemyIDII", clientId);
  };

  const onOtherPlayerMove = ({ x, y, step, hasWinner, id, board }) => {
    if (hasWinner) {
      return gotWinner(step, params);
    } else {
      const newBoard = move(step, board, x, y);
      setMoveAvaible(true);
      setBoard(newBoard);
      setStep(step === "X" ? "O" : "X");
      setEnemyId(id);
      localStorage.setItem("EnemyID", id);
    }
  };

  const handleMove = (x, y, step) => {
    const newBoard = move(step, board, x, y);
    const hasWinner = checkWinner(newBoard, {
      x,
      y,
      type: step,
    });

    let moveCurrentCell = board[x][y];
    if (moveCurrentCell != null) {
      alert("Внимание ячейка занята");
    } else {
      setBoard(newBoard);

      setStep(step === "X" ? "O" : "X");
      setMoveAvaible(false);
      let id = localStorage.getItem("localID");
      ws.send("PLAYER_MOVE", {
        x,
        y,
        step,
        board,
        hasWinner,
        id,
      });
    }
    if (hasWinner) {
      return gotWinner(step, params);
    }
  };

  return (
    <div className="container">
      <GameParticipants />
      <div className={`board${isMoveAvaible ? "" : "-disabled"}`}>
        {board.map((row, rowIndex) => {
          return (
            <div className="row" key={Math.random()}>
              {row.map((xOrO, columnInd) => (
                <div
                  className="cell"
                  key={Math.random()}
                  onClick={() => handleMove(rowIndex, columnInd, step)}
                >
                  {xOrO}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
