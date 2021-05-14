import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");
  const name = sessionStorage.getItem("name");
  const firstLogin = sessionStorage.getItem("firstLogin") === "true";
  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <React.Fragment>
      <div
        className="jumbotron jumbotron-fluid jumbo"
        style={{ paddingTop: 0 }}
      >
        <div className="container">
          <h1 className="display-4 pt-5">Chatty App</h1>
          <p className="lead">
            A place to meet new people and chat with them in special topic
            rooms!
          </p>
        </div>
      </div>
      <div className="container">
        <p className="lead">
          {firstLogin ? "Welcome to Chatty!" : "Hello again!"}
        </p>

        <div className="input-group mb-3">
          <span className="form-control">{name}</span>
        </div>
        <p className="lead">
          {firstLogin
            ? "Your account has been created, You can start chatting."
            : null}
        </p>

        <p className="lead">Type a room You want to join.</p>
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Room"
            value={roomName}
            onChange={handleRoomNameChange}
            className="form-control"
          />
        </div>

        <button className="btn btn-lg btn-outline-teal">
          <Link to={`/${roomName}`} className="link">
            Join room
          </Link>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Home;
