const stage = Cypress.env("stage");

const devConfig = require("./config.dev.js");

const mapping = {
  dev: devConfig
};

module.exports = mapping[stage];
