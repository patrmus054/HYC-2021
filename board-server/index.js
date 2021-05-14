const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const { randomBytes } = require("crypto");
const requireLogin = require("./requireLogin");
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
const messagesByRoom = {};
const users = {};

const PORT = 3030;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

app.get("/messages/:roomId", requireLogin, (req, res) => {
  res.send(messagesByRoom[req.params.roomId] || []);
});

app.post("/messages/:roomId", requireLogin, (req, res) => {
  console.log("in");
  const { content, from } = req.body;
  const messages = messagesByRoom[req.params.roomId] || [];

  messages.push({ from, content });
  messagesByRoom[req.params.roomId] = messages;

  res.status(201).send(messages);
});

app.post("/login", (req, res) => {
  try {
    const password = req.body.password;
    const name = req.body.name;
    //Check if password is given
    if (!password) return res.status(400).send("Give password!");

    const user = users[name];
    let firstLogin = false;
    if (!user) {
      users[name] = { name, password };
      firstLogin = true;
    } else if (user?.password !== password) {
      return res.status(400).send("Wrong password!");
    }

    //Create and assign token for 2h
    const token = jwt.sign(
      {
        _name: name,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
      },
      "dqwiu38982u3hriuhwjnjrkwehrwir847w8rh"
    );

    res.header("token", token).send({ token: token, firstLogin: firstLogin });
  } catch (err) {
    res.status(400).send(err);
  }
});

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId, name } = socket.handshake.query;

  const id = randomBytes(4).toString("hex");

  console.log(id, name);

  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
