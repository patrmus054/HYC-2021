import React, { useState } from "react";

export const AuthContext = React.createContext({
  auth: null,
  fetchUser: () => {},
});

export default (props) => {
  const [auth, setAuth] = useState(null);

  const fetchUser = async () => {
    const user = sessionStorage.getItem("token") ? true : false;
    setAuth(user);
  };

  return (
    <AuthContext.Provider value={{ auth: auth, fetchUser: fetchUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
