let ws;
// let params;
// let gameState;

export function connect(id, isSecondary, cb) {
  ws = new WebSocket("ws://localhost:5000/");
  ws.onopen = () => onOpen(id, isSecondary);
  ws.onmessage = cb;
}

export function onOpen(roomId, isSecondary) {
  console.log("sneding----");
  send("CONNECTED", {
    clientId: Date.now(), // change
    roomId,
    isSecondary, // userName: gameState.userName,
  });
  //   ws.send(
  //     JSON.stringify(
  // {
  //       id: params.id,
  //       type: "connection",
  //       userName: gameState.userName,
  //     })
  //   );
}

// {
//     type: "PLAYER_MOVE",
//     payload: {
//         playerId: 12345,
//         move: {
//             x: 5,
//             y: 7
//         },
//         xOrY: 'X'
//     }
// }

export function onMessage(callback) {
  ws.onmessage(callback);
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
}

// gameState.userName

export function send(type, payload) {
  ws.send(
    JSON.stringify({
      type,
      payload,
    })
  );
}

//   useEffect(
//     () => {
//       //if(gameState.userName){}
//       ws.connect();
//       ws.onOpen(() => {
//         socket.send(
//           JSON.stringify({
//             id: params.id,
//             method: "connection",
//             userName: gameState.userName,
//           })
//         );
//       });
//       const socket = new WebSocket("ws://localhost:5000/");
//       gameState.setSocket(socket);
//       gameState.setSessionId(params.id);
//   socket.onopen = () => {
//     socket.send(
//       JSON.stringify({
//         id: params.id,
//         method: "connection",
//         userName: gameState.userName,
//       })
//     );
//   };

//   ws.onMessage((event) => {
//     let msg = JSON.parse(event.data);
//     //  console.log(msg);
//     switch (msg.method) {
//       case "connection":
//         // console.log(`пользователь ${msg.userName} подключился`);
//         break;
//       case "move":
//         handleMove(msg.x, msg.y, msg.step);
//         // moveHandler(msg);
//         break;
//       default:
//         break;
//     }
//   });
// }
// gameState.userName
// );

//   const moveHandler = (msg) => {
//     console.log(msg);
//     const board = msg.board;
//     move(board);
//   };

// send socket event
// ws.send("move", {
//   x,
//   y,
//   step,
// });
