//SETTING UP LIBRARIES
const express = require('express');
const mongoose = require('mongoose'); //For databases
const { graphqlHTTP } = require('express-graphql');

require('dotenv').config(); //.env file

//IMPORTING FROM OTHER FILES
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

//SET UP EXPRESS
const app = express();
app.use(express.json());
//app.use(cors());

//Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(require('./middleware/is-auth'));

//SETTING UP GRAPHQL
//the ! means it can't be null (required)
app.use('/graphql', graphqlHTTP({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//SETTING UP MONGOOSE 
console.log('Connecting to MongoDB');

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    //SETTING UP SERVER
    console.log('Starting server');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error(error);
  });


