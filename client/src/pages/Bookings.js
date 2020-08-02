import React, { useState, useEffect, useContext } from 'react';

//Context
import { AuthContext } from '../context/AuthContext';

//Services
import BookingService from '../services/BookingService';
import AuthService from '../services/AuthService';

//Components
import Spinner from '../components/Spinner';
import BookingList from '../components/bookings/BookingList';
import BookingsChart from '../components/bookings/BookingsChart';

const Bookings = props => {
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCharts, setIsCharts] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchBookings() {
      setIsLoading(true);
      setBookings(await BookingService.getBookings(authContext.token) || []);
      setUserDetails(await AuthService.userDetails(authContext.token));
      setIsLoading(false);
    }
    fetchBookings();
  }, [authContext]);

  const cancelBooking = async bookingId => {
    try {
      await BookingService.cancelBooking(bookingId, authContext.token);

      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      throw error;
    }
  }

  const renderBookings = () => {
    return (
      <>
        <BookingList
          bookings={bookings}
          isUserEvents={false}
          onDeleteHandler={cancelBooking}
        />

        <BookingList
          bookings={bookings}
          isUserEvents={true}
          createdEvents={userDetails.createdEvents}
        />
      </>
    )
  }

  const renderCharts = () => {
    return (
      <div className="charts">
        <h1 className="chart-title">Price of your Bookings</h1>
        <BookingsChart bookings={bookings.filter(booking => booking.user._id === authContext.userId)} />

        <h1 className="chart-title">(DEBUG) Price of all Bookings</h1>
        <BookingsChart bookings={bookings} />
      </div>
    )
  }

  const renderLoading = () => {
    return (<Spinner />);
  }

  const renderLoaded = () => {
    return (
      <div className="bookings">
        <div className="bookings-controls">
          <button className={isCharts ? "left" : "left active"} onClick={() => setIsCharts(false)}>Lists</button>
          <button className={isCharts ? "right active" : "right"} onClick={() => setIsCharts(true)}>Stats</button>
        </div>

        {
          isCharts ?
            renderCharts() :
            renderBookings()
        }
      </div>
    )
  }

  return (
    <>
      {isLoading ? renderLoading() : renderLoaded()}
    </>
  )
}

export default Bookings;