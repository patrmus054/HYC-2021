import React, { useEffect, useRef } from "react";
import "./ChatRoom.css";

const Messages = ({ olderMessages, messages, name }) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
    console.log(divRef, "ff");
  }, [olderMessages, messages]);

  return (
    <div className="messages">
      {olderMessages.map((olderMessage, i) => (
        <div
          key={i}
          className={`flex flex-column ${
            olderMessage.from === name ? "flex-bottom" : "flex-top"
          }`}
        >
          {olderMessage.from === name ||
          olderMessage.from === olderMessages[i - 1]?.from
            ? null
            : olderMessage.from}
          <span
            key={i}
            className={`message text-break ${
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
          {message.ownedByCurrentUser || message.name === messages[i - 1]?.name
            ? null
            : message.name}
          <span
            key={i}
            className={`message text-break ${
              message.ownedByCurrentUser ? "my-message" : "received-message"
            }`}
          >
            {message.body}
          </span>
        </div>
      ))}
      <div ref={divRef} />
    </div>
  );
};

export default Messages;
