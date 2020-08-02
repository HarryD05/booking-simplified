import React from 'react';

const BookingListItem = props => {
  const { booking, onDelete, canCancel } = props;

  const renderCancelableBooking = () => {
    if (booking) {
      return (
        <div className="booking-container">
          <div className="booking-details">
            <p>{booking.event.title}</p>
            <p>{new Date(+booking.event.date).toLocaleDateString()}</p>
          </div>

          <div className="booking-actions">
            <button className="btn" onClick={onDelete.bind(this, booking._id)}>Cancel</button>
          </div>
        </div>
      )
    }

    return null;
  }

  const renderBooking = () => {
    if (booking) {
      return (
        <div className="booking-details">
          <p>{booking.user.name}  <span className="sub-text">({booking.user.email})</span> </p>

          <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
        </div>
      )
    }

    return null;
  }


  return (
    <li key={booking._id} className="booking-list-item">
      {canCancel ? renderCancelableBooking() : renderBooking()}
    </li>
  )
}

export default BookingListItem;