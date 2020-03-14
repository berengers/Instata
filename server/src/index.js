const {ApolloServer} = require('apollo-server');

const { createStore } = require('../database/app');
const InstataAPI = require('./datasources/instata');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => {
    const token = req.headers && req.headers.authorization || '';
    const res = await store.Token.findOne({ where: { token } });

    if (res) {
      return { user: { id: res.userId } }
    }

    return { user: {} }
  },

  typeDefs,
  resolvers,
  dataSources: () => ({ instataAPI: new InstataAPI({ store }) })
});

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});