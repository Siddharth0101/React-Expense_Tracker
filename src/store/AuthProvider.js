import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
  const setStorage = localStorage.getItem("token");
  const [getToken, setGetToken] = useState(setStorage);
  const loginHandler = (token) => {
    setGetToken(token);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setGetToken();
  };

  const authContext = {
    token: getToken,
    isLogged: !!getToken,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
