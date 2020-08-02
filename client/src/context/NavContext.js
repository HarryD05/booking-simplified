import React, { createContext, useContext } from 'react';
import { NavLink } from 'react-router-dom';

//context
import { AuthContext } from './AuthContext';

export const NavContext = createContext();

export default (props) => {
  const { children } = props;

  const authContext = useContext(AuthContext);

  const renderUnauthenticated = () => {
    return (<li><NavLink to="/auth">Authenticate</NavLink></li>)
  }

  const renderAuthenticatedBookings = () => {
    return (
      <li><NavLink to="/bookings">Bookings</NavLink></li>
    )
  }

  const renderAuthenticatedLogout = () => {
    return (
      <li><button onClick={() => authContext.logout()}>Logout</button></li>
    )
  }

  return (
    <div>
      <NavContext.Provider value={{ renderUnauthenticated, renderAuthenticatedBookings, renderAuthenticatedLogout }}>
        {children}
      </NavContext.Provider>
    </div>
  )
}