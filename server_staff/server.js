const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { DateTimeResolver, DateTimeTypeDefinition } = require("graphql-scalars");

const resolvers = require('./graphql/resolvers');
const typeDefs = gql(fs.readFileSync('./graphql/typeDefs.graphql', { encoding: 'utf-8' }));

const server = new ApolloServer({
  typeDefs,resolvers
});

server.listen(5000).then(({
  url
}) => {
  console.log(`🚀 Server ready at ${url}`);
});