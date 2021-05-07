import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./LoginForm.css";

const LoginForm = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  let valid = true;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const login = async () => {
    if (!password) {
      valid = false;
    } else {
      try {
        const res = await axios.post("http://localhost:3030/login", {
          name,
          password,
        });
        sessionStorage.setItem("name", jwt_decode(res.data)._name);
        sessionStorage.setItem("token", res.data);
        props.history.replace("/");
      } catch (error) {
        valid = false;
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("token");
      }
    }
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
        <p className="lead">Login to start chatting!</p>
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            className="form-control"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <button className="btn btn-lg btn-outline-teal" onClick={login}>
          Login{" "}
        </button>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
