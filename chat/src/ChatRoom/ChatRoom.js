import React, { useEffect, useState, useRef } from "react";
import useChat from "../useChat";
import "./ChatRoom.css";
import { RiSendPlaneLine as Send } from "react-icons/ri";
import axios from "axios";
import Messages from "./Messages";

const ChatRoom = (props) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  const { messages, sendMessage } = useChat(roomId, name); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be send
  const [olderMessages, setOlderMessages] = useState([]);
  const [pressed, setPressed] = useState(false);
  const inputRef = useRef(null);

  const fetchMessages = async () => {
    let headers = {
      headers: { token: token },
    };

    try {
      const res = await axios.get(`/messages/${roomId}`, headers);
      setOlderMessages(res.data);
    } catch (error) {
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    fetchMessages();
  }, []);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter" && newMessage.trim().length !== 0) {
      setPressed(true);
      handleSendMessage();
      setTimeout(() => {
        setPressed(false);
        inputRef.current.focus();
      }, 300);
    }
  };

  const handleSendMessage = async () => {
    let headers = {
      headers: { token: token },
    };
    try {
      if (newMessage.trim().length !== 0) {
        const res = await axios.post(
          `/messages/${roomId}`,
          {
            content: newMessage,
            from: name,
          },
          headers
        );
        sendMessage(newMessage, name);
        setNewMessage("");
      }
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
        <Messages
          olderMessages={olderMessages}
          messages={messages}
          name={name}
        />

        <div className="input-group mt-1">
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            onKeyPress={handleKeyPressed}
            placeholder="Write message..."
            className="form-control"
            disabled={pressed}
            ref={inputRef}
          />{" "}
          <div className="input-group-prepend">
            <button
              onClick={handleSendMessage}
              className="btn btn-lg btn-teal"
              disabled={pressed}
              style={{ height: "61.19px" }}
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
