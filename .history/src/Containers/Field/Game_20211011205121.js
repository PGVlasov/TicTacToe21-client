import React from "react";
import { useEffect, useState } from "react";
import _ from "lodash";
import "./Field1.css";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import * as ws from "./websocket";
import { move, gotWinner } from "./game-core";
import { checkWinner } from "./checkWinner.js";
import { useLocation } from "react-router-dom";

const Game = () => {
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
  const usernameRef = useRef();
  //const [modal, setModal] = useState(true);
  const params = useParams();

  console.log(params);

  //   const boardRef = useRef();

  useEffect(() => {
    ws.connect(params.id, (event) => {
      let msg = JSON.parse(event.data);
      console.log("--->", msg);
      switch (msg.type) {
        //   case "connection":
        //     // console.log(`пользователь ${msg.userName} подключился`);
        //     break;
        case "PLAYER_MOVE":
          console.log("RECEIVED_MSG", msg);
          onOtherPlayerMove(msg.payload);
          //   handleMove(msg.payload.x, msg.payload.y, msg.payload.step);
          //   handleMove(msg.x, msg.y, msg.step);
          // moveHandler(msg);
          break;
        default:
          break;
      }
    });

    setTimeout(() => {
      //   ws.onMessage((event) => {
      //     let msg = JSON.parse(event.data);
      //     console.log("--->", msg);
      //     switch (msg.type) {
      //       //   case "connection":
      //       //     // console.log(`пользователь ${msg.userName} подключился`);
      //       //     break;
      //       case "PLAYER_MOVE":
      //         console.log("RECEIVED_MSG", msg);
      //         //   handleMove(msg.x, msg.y, msg.step);
      //         // moveHandler(msg);
      //         break;
      //       default:
      //         break;
      //     }
      //   });
    }, 1000);

    // setTimeout(() => {
    //   ws.send("azaza", { "asdasd": 123 });
    // }, 2000);
  }, []);

  //   const setUserName = () => {
  //     gameState.userName = usernameRef.current.value;
  //     // console.log("username:", gameState.userName);
  //     //ws.onOpen();
  //     setModal(false);
  //   };

  const onOtherPlayerMove = ({ x, y, step, board, hasWinner }) => {
    // console.log(this.msg.moveAvaible);
    console.log(hasWinner);
    if (hasWinner) {
      return gotWinner(step, params);
    } else {
      const newBoard = move(step, board, x, y);
      console.log("MOVE", newBoard);
      // const hasWinner = checkWinner(newBoard, {
      //   x,
      //   y,
      //   type: step,
      // });
      // console.log("hasWinner", hasWinner);
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
  );
};

export default Game;
