import React, { useContext } from 'react';

//context
import { AuthContext } from '../../context/AuthContext';

//components
import BookingListItem from './BookingListItem';

//helpers
import { orderEventsByDate } from '../../helpers/index';

const BookingList = props => {
  let { bookings, onDeleteHandler, isUserEvents, createdEvents } = props;

  const authContext = useContext(AuthContext);

  const renderUsersEvents = () => {
    if (createdEvents) {
      const hasEvents = (createdEvents.length > 0);

      const renderBookings = () => {
        createdEvents = orderEventsByDate(createdEvents);
        return createdEvents.map(event => renderEventSection(event));
      }

      return (
        <div className="bookings-section">
          <h1>Bookings for your events</h1>

          {
            hasEvents ?
              renderBookings() :
              <p>You haven't created any events yet!</p>
          }
        </div>
      )
    }

    return null;
  }

  const renderEventSection = event => {
    if (event.bookings) {
      const hasBookings = (event.bookings.length > 0);

      const renderBookings = () => {
        return (
          <ul className="bookings-list">
            {
              event.bookings.map(booking => {
                return (
                  <BookingListItem key={booking._id} booking={booking} />
                )
              })
            }
          </ul>
        )
      }

      return (
        <div key={event._id}>
          <h2>{event.title} - {new Date(event.date).toLocaleDateString()}</h2>

          {
            hasBookings ?
              renderBookings() :
              <p>No bookings for this event.</p>
          }

        </div>
      )
    } else {
      return null;
    }
  }

  const renderUsersBookings = () => {
    const filteredBookings = bookings.filter(booking => {
      return booking.user._id === authContext.userId;
    });

    const hasBookings = (filteredBookings.length > 0);

    const renderBookings = () => {
      return (
        <ul className="bookings-list">
          {
            filteredBookings
              .map(booking => {
                return (
                  <BookingListItem key={booking._id} booking={booking} onDelete={onDeleteHandler} canCancel />
                )
              })
          }
        </ul>
      )
    }

    return (
      <div className="bookings-section">
        <h1>Your bookings</h1>

        {
          hasBookings ?
            renderBookings() :
            <p>You have not booked any events!</p>
        }
      </div>
    )
  }

  return (
    <>
      {isUserEvents ? renderUsersEvents() : renderUsersBookings()}
    </>
  )
}

export default BookingList;