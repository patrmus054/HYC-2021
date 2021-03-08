import React, { useState } from "react";

const ChatInput = ({ onSubmitMessage }) => {
  const [message, setMessage] = useState("");
  return (
    <form
      action="."
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitMessage(message);
        setMessage("");
      }}
    >
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          placeholder={"Enter message..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary"> Send </button>
      </div>
    </form>
  );
};

export default ChatInput;
