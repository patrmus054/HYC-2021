const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3030 });
const messages = [];

const getStringStorage = () => {
  const stringifiedState = JSON.stringify(messages);
  console.log(stringifiedState);
  return stringifiedState;
};

wss.on("connection", function connection(ws) {
  ws.on("message", async (message) => {
    messages.unshift(JSON.parse(message));
    wss.clients.forEach((client) => {
      client.send(getStringStorage());
    });
  });

  ws.send(getStringStorage());
});
