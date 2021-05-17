import React, { useState, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./LoginForm.css";
import { AuthContext } from "../auth-context";

const LoginForm = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pvalid, setPvalid] = useState(true);
  const [nvalid, setNvalid] = useState(true);
  const [wrongPass, setWrongPass] = useState(false);

  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  const fetchUser = useContext(AuthContext).fetchUser;

  const handlePasswordChange = (event) => {
    setWrongPass(false);
    setPvalid(true);
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setWrongPass(false);
    setNvalid(true);
    setName(event.target.value);
  };

  const login = async () => {
    let formValid = true;
    if (!password || password.length < 4) {
      setPvalid(false);
      formValid = false;
    }
    if (!name || name.length < 3) {
      setNvalid(false);
      formValid = false;
    }
    if (formValid) {
      try {
        const res = await axios.post("/login", {
          name,
          password,
        });
        sessionStorage.setItem("name", jwt_decode(res.data.token)._name);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("firstLogin", res.data.firstLogin);

        props.history.replace("/");
        fetchUser();
      } catch (error) {
        if (error.response.status === 400) {
          setWrongPass(true);
        }
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
          <h1 className="display-4 pt-5">HYC SAP POLSL</h1>
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
            className={`form-control ${nvalid === true ? "" : "is-invalid"}`}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={`form-control ${pvalid === true ? "" : "is-invalid"}`}
          />
        </div>
        {wrongPass ? <p className="lead text-danger">Wrong password!</p> : null}
        <button className="btn btn-lg btn-outline-teal" onClick={login}>
          Login{" "}
        </button>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
