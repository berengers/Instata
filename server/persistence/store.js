const Sequelize = require('sequelize');

module.exports = config => {
  return new Sequelize(config);
};
