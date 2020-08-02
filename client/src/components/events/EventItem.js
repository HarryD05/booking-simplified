import React, { useContext } from 'react';

//context
import { AuthContext } from '../../context/AuthContext';

const EventItem = props => {
  const { event, bookings } = props;

  const authContext = useContext(AuthContext);

  const hasBooked = () => {
    if (bookings) {
      if (bookings.length > 0) {
        const userBookings = bookings.filter(booking => booking.user._id === authContext.userId);

        if (userBookings.length > 0) {
          return (userBookings.filter(booking => booking.event._id === event._id).length > 0)
        }

        return false;
      }
    }

    return false;
  }

  return (
    <li key={event._id} className="events-list-item">
      <div className="info">
        <h1>{event.title}</h1>
        <h2 className="sub-text">£{event.price} - {new Date(event.date).toLocaleDateString()}</h2>
      </div>

      <div className="access">
        {event.creator._id === authContext.userId ?
          <p className="sub-text">Your the owner of this event.</p> :
          hasBooked() ?
            <p className="sub-text">Booked</p> :
            <button className="btn" onClick={props.onDetail.bind(this, event._id)}>View details</button>}
      </div>
    </li>
  )
}

export default EventItem;