import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

//context
import { AuthContext } from '../../context/AuthContext';
import { NavContext } from '../../context/NavContext';


const Navbar = props => {
  const authContext = useContext(AuthContext);
  const navContext = useContext(NavContext);

  const renderAuthenticated = () => {
    return (
      <>
        {navContext.renderAuthenticatedBookings()}
        {navContext.renderAuthenticatedLogout()}
      </>
    )
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        EventsSimplified
      </div>
      <div className="spacer" />
      <div className="nav-items">
        <ul>
          {authContext.token ? null : navContext.renderUnauthenticated()}
          {<li><NavLink to="/events">Events</NavLink></li>}
          {authContext.token ? renderAuthenticated() : null}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;