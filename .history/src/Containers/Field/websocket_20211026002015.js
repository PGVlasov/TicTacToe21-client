let ws;

export function connect(id, isSecondary, cb, msg) {
  ws = new WebSocket("ws://localhost:5000/");
  ws.onopen = () => onOpen(id, isSecondary, msg);
  ws.onmessage = cb;
}

export function onOpen(roomId, isSecondary) {
  console.log("sneding----");
  send("CONNECTED", {
    clientId: localStorage.getItem("localID"),
    myIdToEnemyId: localStorage.getItem("localID"),
    roomId,
    isSecondary, // userName: gameState.userName,
  });

  send("READYTOPLAY", {
    clientId: localStorage.getItem("localID"),
    myIdToEnemyId: localStorage.getItem("localID"),
    roomId,
    isSecondary, // userName: gameState.userName,
  });
}

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
