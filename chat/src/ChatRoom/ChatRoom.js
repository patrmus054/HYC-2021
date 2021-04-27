import React, { useEffect, useState } from "react";
import useChat from "../useChat";
import "./ChatRoom.css";
import { RiSendPlaneLine as Send } from "react-icons/ri";
import axios from "axios";

const ChatRoom = (props) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  const { messages, sendMessage } = useChat(roomId, name); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be send
  const [olderMessages, setOlderMessages] = useState([]);

  const fetchMessages = async () => {
    let headers = {
      headers: { token: token },
    };

    try {
      const res = await axios.get(
        `http://localhost:3030/messages/${roomId}`,
        headers
      );
      setOlderMessages(res.data);
    } catch (error) {
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    let headers = {
      headers: { token: token },
    };
    try {
      const res = await axios.post(
        `http://localhost:3030/messages/${roomId}`,
        {
          content: newMessage,
          from: name,
        },
        headers
      );
      sendMessage(newMessage, name);
      setNewMessage("");
    } catch (error) {
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("token");
    }
  };

  return (
    <React.Fragment>
      <div
        className="jumbotron jumbotron-fluid jumbo-chat"
        style={{ paddingTop: 0 }}
      >
        <div className="container">
          <h1 className="display-4 ">Room: {roomId}</h1>
          <p className="lead">
            A place to meet new people and chat with them in special topic
            rooms!
          </p>
        </div>
      </div>
      <div className="container ">
        <div className="messages">
          {olderMessages.map((olderMessage, i) => (
            <div
              key={i}
              className={`flex flex-column ${
                olderMessage.from === name ? "flex-bottom" : "flex-top"
              }`}
            >
              {olderMessage.from === name ? null : olderMessage.from}
              <span
                key={i}
                className={`message ${
                  olderMessage.from === name ? "my-message" : "received-message"
                }`}
              >
                {olderMessage.content}
              </span>
            </div>
          ))}
          <hr />
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex flex-column ${
                message.ownedByCurrentUser ? "flex-bottom" : "flex-top"
              }`}
            >
              {message.ownedByCurrentUser ? null : message.name}
              <span
                key={i}
                className={`message ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {message.body}
              </span>
            </div>
          ))}
        </div>
        <div className="input-group mt-1">
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="form-control"
          />{" "}
          <div className="input-group-prepend">
            <button
              onClick={handleSendMessage}
              className="btn btn-lg btn-teal"
              style={{ height: "100%" }}
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatRoom;
