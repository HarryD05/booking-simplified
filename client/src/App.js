import React, { useContext, useState } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//Components
import Navbar from './components/navigation/Navbar';
import DrawerToggleButton from './components/navigation/DrawerToggleButton';
import SideDrawer from './components/navigation/SideDrawer';
import Backdrop from './components/Backdrop';

//Pages
import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';

//Context
import { AuthContext } from './context/AuthContext';

const App = () => {
  const authContext = useContext(AuthContext);

  const [isSideOpen, setIsSideOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setIsSideOpen(!isSideOpen);
  }

  const backdropClickHandler = () => {
    setIsSideOpen(false);
  }

  return (
    <Router>
      <>
        <Navbar />

        <div className="side-toggle">
          <DrawerToggleButton click={drawerToggleClickHandler} />
        </div>
        <SideDrawer show={isSideOpen} />
        {isSideOpen ? <Backdrop click={backdropClickHandler} /> : null}

        <main>
          <Switch>
            {!authContext.token ? null : <Redirect from="/" to="/events" exact />}
            {!authContext.token ?
              <Route path="/auth" component={Auth} exact /> :
              <Redirect from="/auth" to="/events" />
            }

            <Route path="/events" component={Events} />

            {authContext.token ? <Route path="/bookings" component={Bookings} /> : null}

            {!authContext.token ? <Redirect to="/auth" exact /> : null}
          </Switch>
        </main>
      </>
    </Router>
  );
}

export default App;
