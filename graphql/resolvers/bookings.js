const { dateToString } = require('../../helpers/date');
const { transformBooking, transformEvent } = require('./merge');

const Booking = require('../../models/BookingModel');
const Event = require('../../models/EventModel');
const User = require('../../models/UserModel');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT AUTHENTICATED');
    }

    try {
      const result = await Booking.find();

      return result.map(booking => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT AUTHENTICATED');
    }

    try {
      const bookedEvent = await Event.findById(args.eventId);

      const bookingsWithSameUser = await Booking.find({
        event: { _id: bookedEvent._id },
        user: { _id: req.userId }
      });

      if (bookingsWithSameUser.length === 0) {
        const booking = new Booking({
          user: req.userId,
          event: bookedEvent._id
        });

        const result = await booking.save();

        bookedEvent.bookings = [
          ...bookedEvent.bookings,
          result._doc._id
        ];
        await bookedEvent.save();

        return transformBooking(result);
      } else {
        throw new Error('ALREADY BOOKED');
      }
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT AUTHENTICATED');
    }

    try {
      const booking = await Booking.findById(args.bookingId).populate('event');

      if (booking.user + "" === req.userId + "") {
        const event = await Event.findById(booking.event._id).populate({
          path: 'bookings',
          model: 'Booking'
        });

        event.bookings = event.bookings.filter(eventBooking => eventBooking._id !== booking._id);

        await event.save();

        await Booking.deleteOne({ _id: args.bookingId });

        return event;
      } else {
        return new Error('Must be the user that made this booking');
      }
    } catch (error) {
      throw error;
    }
  }
}