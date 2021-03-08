import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const URL = "ws://localhost:3030";

const Chat = () => {
  const [ws, setWs] = useState(new WebSocket(URL));
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    ws.onmessage = (evt) => {
      // on receiving a message, add it to the list of messages
      const messages = JSON.parse(evt.data);
      console.log(messages);
      setMessages(messages);
    };

    ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      setWs(new WebSocket(URL));
    };
  }, [messages]);

  const addMessage = (message) => setMessages([message, ...messages]);

  const submitMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: name, message: messageString };
    ws.send(JSON.stringify(message));
    addMessage(message);
  };

  return (
    <div className="container">
      <div className="input-group mb-3">
        <label className="input-group-text">Name</label>
        <input
          className="form-control"
          type="text"
          id={"name"}
          placeholder={"Enter your name..."}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <ChatInput
        ws={ws}
        onSubmitMessage={(messageString) => submitMessage(messageString)}
      />
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.message}
          name={message.name}
        />
      ))}
    </div>
  );
};

export default Chat;
