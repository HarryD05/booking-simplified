import Service from './index';

export default {
  getBookings: async (token) => {
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            updatedAt
            event {
              _id
              title
              date
              price
              creator {
                _id
              }
            }
            user {
              _id
            }
          }
        }
      `
    };

    return await Service.sendRequest('bookings', requestBody, token);
  },
  bookEvent: async (eventId, token) => {
    const requestBody = {
      query: `
        mutation BookEvent($id: ID!) {
          bookEvent(eventId: $id) {
            _id
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id: eventId
      }
    };

    return await Service.sendRequest('bookEvent', requestBody, token);
  },
  cancelBooking: async (bookingId, token) => {
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            _id
            price
            title
            date
          }
        }
      `,
      variables: {
        id: bookingId
      }
    };

    return await Service.sendRequest('cancelBooking', requestBody, token);
  }
}