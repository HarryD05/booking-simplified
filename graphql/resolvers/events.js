const { transformEvent } = require('./merge');

const Event = require('../../models/EventModel');
const User = require('../../models/UserModel');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();

      return events.map(event => {
        return transformEvent(event);
        //This means when creator is called the user function is called
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT AUTHENTICATED');
    }

    const details = args.eventInput;

    const newEvent = new Event({
      title: details.title,
      description: details.description,
      price: +details.price,
      date: new Date(details.date),
      creator: req.userId,
      bookings: []
    }); //the + converts the price to a number
    let createdEvent;

    try {
      const result = await newEvent.save();

      createdEvent = transformEvent(result);

      const creatorUser = await User.findById(req.userId);

      if (!creatorUser) {
        throw new Error('User doesn\'t exist');
      }

      creatorUser.createdEvents.push(newEvent);
      await creatorUser.save();

      return createdEvent;
    } catch (error) {
      throw error;
    }
  },
}