import { createContext, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, _setAuth] = useState({});
  const setAuth = (value) => {
    if (value === null)  throw new Error("Cannot set auth to null");
    _setAuth(value);
  };
    return (
    <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
    </AuthContext.Provider> 

    )
};

export default AuthContext;