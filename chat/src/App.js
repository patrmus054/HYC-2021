import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";
import Navbar from "./Navbar/Navbar";
import PrivateRoute from "./privateRoute";
import LoginForm from "./LoginForm/LoginForm";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <PrivateRoute exact path="/:roomId" component={ChatRoom} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
