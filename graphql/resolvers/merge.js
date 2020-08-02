const User = require('../../models/UserModel');
const Event = require('../../models/EventModel');
const Booking = require('../../models/BookingModel');

const { dateToString } = require('../../helpers/date');

//Transforming data
const transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
    bookings: transformBookings.bind(this, event.bookings)
  } //Bind means when creator is called the user function is called
}

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
}

const transformBookings = async bookingIds => {
  try {
    const bookings = await Booking.find({ _id: { $in: bookingIds } });

    return bookings.map(booking => {
      return transformBooking(booking);
    });
  } catch (error) {
    throw error;
  }
}

//Accessing data
const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });

    return events.map(event => {
      return transformEvent(event);
    });
  } catch (error) {
    throw error;
  }
}

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);

    return event;
  } catch (error) {
    throw error;
  }
}

const user = async userId => {
  try {
    const userResult = await User.findById(userId);

    return {
      ...userResult._doc,
      password: null,
      createdEvents: events.bind(this, userResult._doc.createdEvents)
    }
  } catch (error) {
    throw error;
  }
}


exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
exports.user = user;