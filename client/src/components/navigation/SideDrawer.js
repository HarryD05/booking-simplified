import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

//components
import { AuthContext } from '../../context/AuthContext';
import { NavContext } from '../../context/NavContext';

//Images
import Padlock from '../../assets/padlock.svg';
import Calendar from '../../assets/calendar.svg';
import Bookings from '../../assets/book.svg';
import Logout from '../../assets/logout.svg';

const SideDrawer = props => {
  const { show } = props;

  const authContext = useContext(AuthContext);
  const navContext = useContext(NavContext);

  let classes = 'side-drawer ';
  if (show) {
    classes += 'open'
  }

  return (
    <nav className={classes}>
      <h1>Events<br />Simplified</h1><hr className="line" />
      <ul>
        {
          authContext.token ? null :
            <div className="nav-item">
              <img className="nav-img" src={Padlock} alt="padlock" />
              {navContext.renderUnauthenticated()}
            </div>
        }

        {
          <div className="nav-item">
            <img className="nav-img" src={Calendar} alt="calendar" />
            <li><NavLink to="/events">Events</NavLink></li>
          </div>
        }

        {
          authContext.token ?
            <>
              <div className="nav-item">
                <img className="nav-img" src={Bookings} alt="bookings" />
                {navContext.renderAuthenticatedBookings()}
              </div>

              <div className="nav-item logout">
                <img className="nav-img" src={Logout} alt="logout" />
                {navContext.renderAuthenticatedLogout()}
              </div>
            </> : null
        }
      </ul>
    </nav>
  )
}

export default SideDrawer;