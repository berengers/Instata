const {ApolloServer} = require('apollo-server');
const config = require("./config");
const createStore = require("./persistence/store")
const registerModels = require("./persistence/models")

const InstataAPI = require('./datasources/instata');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const store = createStore(config.DB)
const models = registerModels(store)

const server = new ApolloServer({
  context: async ({ req }) => {
    const token = req.headers && req.headers.authorization || '';
    const res = await models.Token.findOne({ where: { token } });

    if (res) {
      return { user: { id: res.userId } }
    }

    return { user: {} }
  },

  typeDefs,
  resolvers,
  dataSources: () => ({ instataAPI: new InstataAPI({ models }) })
});

server.listen({
  host: config.HOST,
  port: config.PORT 
}).then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});