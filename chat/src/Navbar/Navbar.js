import React, { useContext, useEffect } from "react";
import { RiMailStarFill as Logo } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "../Flex.css";
import { AuthContext } from "../auth-context";

const Navbar = () => {
  const auth = useContext(AuthContext).auth;

  useEffect(() => {}, [auth]);

  const renderContent = () => {
    switch (auth) {
      case true:
        return (
          <span
            className="btn text-white"
            style={{ position: "absolute", right: 20 }}
            onClick={logout}
          >
            Logout
          </span>
        );
      default:
        return;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    window.location.reload(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-teal flex flex-justify-center">
      <div className="nav-wrapper logo">
        <Link
          to="/"
          className="text-light title flex flex-middle flex-justify-around"
        >
          <Logo />
          Chatty
        </Link>
      </div>

      {renderContent()}
    </nav>
  );
};

export default Navbar;
