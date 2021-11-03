let ws;

export function connect(id, isSecondary, cb) {
  ws = new WebSocket("ws://localhost:5000/");
  ws.onopen = () => onOpen(id, isSecondary);
  ws.onmessage = cb;
}

export function onOpen(roomId, isSecondary) {
  send("CONNECTED", {
    clientId: localStorage.getItem("localID"),
    roomId,
    isSecondary,
  });
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
