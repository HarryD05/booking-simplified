import React, { createContext, useState } from 'react';
//import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export default (props) => {
  const { children } = props;

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  //const [isLoaded, setIsLoaded] = useState(false);

  const login = (token_, userId_, tokenExpiration_) => {
    setToken(token_);
    setUserId(userId_);
  }

  const logout = () => {
    setToken(null);
    setUserId(null);
  }

  return (
    <div>
      <AuthContext.Provider value={{ token, setToken, userId, setUserId, login, logout }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}