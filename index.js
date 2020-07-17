require('dotenv').config();
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const ShowsAPI = require('./src/shows');
const UsersAPI = require('./src/users');

// set up any dataSources our resolvers need
const dataSources = () => ({
    showsAPI: new ShowsAPI(),
    usersAPI: new UsersAPI(),
});

const context = async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || '';
    return {};
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context,
    engine: {
        apiKey: process.env.APOLLO_KEY,
        reportSchema: true
    },
    cors: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server started at >> ${url}`);
});
