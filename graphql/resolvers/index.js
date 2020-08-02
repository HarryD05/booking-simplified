const userResolver = require('./user'); //Or auth
const eventsResolver = require('./events');
const bookingResolver = require('./bookings');

const rootResolver = {
  ...userResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;