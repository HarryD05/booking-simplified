export default {
  sendRequest: async (name, requestBody, token = null) => {
    let headers = {
      'Content-Type': 'application/json'
    }

    if (token !== null) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let output;
    await fetch('https://event-booking-api--davish16.repl.co/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }

        return res.json();
      })
      .then(result => {
        output = result.data[name];
      })
      .catch(error => {
        console.error(error);
      });

    return output;
  }
}