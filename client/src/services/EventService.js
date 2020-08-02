import Service from './index';

export default {
  createEvent: async (event, token) => {
    const { title, description, price, date } = event;

    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
          createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
            _id
            title
            description
            price
            date
          }
        }
      `,
      variables: {
        title,
        description,
        price,
        date
      }
    };

    return await Service.sendRequest('createEvent', requestBody, token);
  },
  getEvents: async () => {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
              name
            }
            bookings {
              _id 
              user {
                _id
                email
                name
              }
              event {
                _id
                title
                date
                creator {
                  _id
                  email
                  name
                }
              }
            }
          }
        }
      `
    };

    return await Service.sendRequest('events', requestBody, null);
  }
}