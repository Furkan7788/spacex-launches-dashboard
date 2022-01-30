const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const spacexSchema = require('./schemas/spacexSchema');
const app = express();

// JUST ONE ENDPOINT. The query and mutaions inside a schema.
app.use(
    '/graphql',
    graphqlHTTP({
      schema: spacexSchema,
      graphiql: true,
    }),
  );
  
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
      console.log(`Server start on ${PORT}`)
  });
