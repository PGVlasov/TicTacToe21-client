import React from "react";
import { useEffect, useState } from "react";
import _ from "lodash";
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
  //const clientId = Date.now();
  const isSecondary = getIsSecondary();
  console.log("KOC__", isSecondary);
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

  const params = useParams();

  console.log(params);

  useEffect(() => {
    ws.connect(params.id, isSecondary, (event) => {
      let msg = JSON.parse(event.data);
      console.log("--->", msg);
      switch (msg.type) {
        case "PLAYER_MOVE":
          console.log("RECEIVED_MSG", msg);
          onOtherPlayerMove(msg.payload);
          break;
        default:
          break;
      }
    });
  }, []);

  const onOtherPlayerMove = ({ x, y, step, board, hasWinner }) => {
    console.log(hasWinner);
    if (hasWinner) {
      return gotWinner(step, params);
    } else {
      const newBoard = move(step, board, x, y);
      console.log("MOVE", newBoard);
      setMoveAvaible(true);
      setBoard(newBoard);
      setStep(step === "X" ? "O" : "X");
    }
  };

  const handleMove = (x, y, step, diasbled) => {
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
      ws.send("PLAYER_MOVE", {
        x,
        y,
        step,
        board,
        hasWinner,
      });
    }
    if (hasWinner) {
      return gotWinner(step, params);
    }
  };
  console.log("moveAvaible after move", isMoveAvaible);
  if (!isMoveAvaible) {
    console.log("MOVE IS NOT AVAIBLE, WAIT SECOND PLAYER MOVE");
  }
  return (
    <div className="container">
      <div
        className={`board${isMoveAvaible ? "" : "-disabled"}`}
        //key={params.id + Math.random()}
      >
        {board.map((row, rowIndex) => {
          return (
            <div className="row">
              {row.map((xOrO, columnInd) => (
                <div
                  className="cell"
                  onClick={() => handleMove(rowIndex, columnInd, step)}
                >
                  {xOrO}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <GameParticipants />
    </div>
  );
};

export default Game;
