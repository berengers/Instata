const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express");
const logger = require('pino')();
const loggingMiddleware = require('express-pino-logger')();
const Sequelize = require("sequelize");

const config = require('./config');

module.exports.createStore = () => {
  const db = new Sequelize(config.DB);

  db.sync({force: false}).then(() => {
    logger.info('database tables created')
  });

  var app = express();

  app.use(cors());
  app.use(loggingMiddleware);
  app.use(bodyParser.json());

  app.listen(config.PORT, () => {
    logger.info(`http server listening on port ${config.PORT}`);
  });

  const User = db.define('users', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: Sequelize.STRING, unique: true, allowNull: false},
    firstName: {type: Sequelize.STRING, allowNull: false},
    lastName: {type: Sequelize.STRING, allowNull: false},
    nickName: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    profilPicture: {type: Sequelize.STRING, allowNull: true},
  });

  const UserUser = db.define('userUser', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    userFollowerId: {type: Sequelize.INTEGER, allowNull: false, references: { model: 'user', key: 'id' }},
    userId: {type: Sequelize.INTEGER, allowNull: false, references: { model: 'user', key: 'id' }}
  }, { freezeTableName: true });

  const Token = db.define('tokens', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    token: {type: Sequelize.STRING, allowNull: false},
    userId: {type: Sequelize.INTEGER, allowNull: false}
  });

  const Post = db.define('posts', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    description: {type: Sequelize.STRING, allowNull: true},
    media: {type: Sequelize.STRING, allowNull: true},
    userId: {type: Sequelize.INTEGER, allowNull: false}
  });

  User.belongsToMany(User,{through: 'userUser', foreignKey: 'userId', as: 'follower'});
  UserUser.belongsTo(User, { foreignKey: 'userFollowerId', as: 'userFollower' });
  UserUser.belongsTo(User, { foreignKey: 'userId', as: 'userFollow' });
  User.belongsToMany(User,{through: 'userUser', foreignKey: 'userFollowerId', as: 'user'});
  Token.belongsTo(User);
  Post.belongsTo(User);

  return { db, User, UserUser, Token, Post }
};

