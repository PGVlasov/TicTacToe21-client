let ws;

export function connect(id, isSecondary, cb, msg) {
  ws = new WebSocket("ws://localhost:5000/");
  ws.onopen = () => onOpen(id, isSecondary, msg);
  ws.onmessage = cb; ////вот тут
}

export function onOpen(roomId, isSecondary, msg) {
  console.log("соедениние установлено");
  send("CONNECTED", {
    clientId: localStorage.getItem("localID"),
    roomId,
    isSecondary, // userName: gameState.userName,
  });
  //   send("READYTOPLAY", {
  //     clientId: localStorage.getItem("localID"),
  //     myIdToEnemyId: localStorage.getItem("localID"),
  //     roomId,
  //     isSecondary, // userName: gameState.userName,
  //   });
}

export function onMessage(event) {
  ws.onmessage = (event) => {
    console.log("с сервера пришло сообщение", event.data);
  };
}

export function send(type, payload) {
  ws.send(
    JSON.stringify({
      type,
      payload,
    })
  );
}
