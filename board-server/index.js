const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const storage = {
  circle: {
    top: 0,
    left: 0,
    occupied: false
  },
  triangle: {
    top: 0,
    left: 0,
    occupied: false
  },
  square: {
    top: 0,
    left: 0,
    occupied: false
  },
  pane: {
    top: 0,
    left: 0,
    occupied: false
  }
};

const setOccupied = (payload) => {
  storage[payload.id].occupied = payload.occupied;
};

const setPosition = (payload) => {
  storage[payload.id].top = payload.top;
  storage[payload.id].left = payload.left;
};

const handleNewMessage = async (message) => {
  try {
    const parsedMessage = await JSON.parse(message);
    switch (parsedMessage.type) {
      case 'occupied':
        setOccupied(parsedMessage.payload);
        break;
      case 'position':
        setPosition(parsedMessage.payload);
        break;
      default:
        console.log('wrong message type');
    }
  } catch (e) {
    console.log('Message is no JSON type');
  }
};

const getStringStorage = () => {
  const stringifiedState = JSON.stringify(storage);
  console.log(stringifiedState);
  return stringifiedState;
};

const broadcast = (message) => {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    await handleNewMessage(message);
    broadcast(getStringStorage());
  });

  ws.send(getStringStorage());
});
