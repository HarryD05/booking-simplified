import Service from './index';

export default {
  login: async user => {
    const { email, password } = user;

    const requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email,
        password
      }
    };

    return await Service.sendRequest('login', requestBody, null);
  },
  signup: async user => {
    const { name, email, password } = user;

    const requestBody = {
      query: `
        mutation Signup($name: String!, $email: String!, $password: String) {
          createUser(userInput: {name: $name, email: $email, password: $password}) {
            _id
            email
            name
          }
        }
      `,
      variables: {
        name,
        email,
        password
      }
    };

    return await Service.sendRequest('createUser', requestBody, null);
  },
  userDetails: async (token) => {
    const requestBody = {
      query: `
        query {
          userDetails {
            _id
            email
            name
            createdEvents {
              _id
              title
              date
              bookings {
                _id
                user {
                  _id 
                  email
                  name
                }
                createdAt
              }
            }
          }
        }
      `
    };

    return await Service.sendRequest('userDetails', requestBody, token);
  }
}