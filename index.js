require('dotenv').config();
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    engine: {
        apiKey: process.env.APOLLO_KEY,
        reportSchema: true
    },
    cors: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server started at >> ${url}`);
});