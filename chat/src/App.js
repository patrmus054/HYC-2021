import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";
import Navbar from "./Navbar/Navbar";
import PrivateRoute from "./privateRoute";
import LoginForm from "./LoginForm/LoginForm";
import { AuthContext } from "./auth-context";
import Spinner from "./Spinner/Spinner";

function App() {
  const auth = useContext(AuthContext).auth;
  const fetchUser = useContext(AuthContext).fetchUser;

  useEffect(() => {
    fetchUser();
  }, []);

  let content = <Spinner />;
  if (auth !== null)
    content = (
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

  return content;
}

export default App;
