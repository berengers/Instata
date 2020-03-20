const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const logger = require("pino")();
const loggingMiddleware = require("express-pino-logger")();
const Sequelize = require("sequelize");

const config = require("./config");

module.exports.createStore = () => {
  const db = new Sequelize(config.DB);

  db.sync({ force: false }).then(() => {
    logger.info("database tables created");
  });

  var app = express();

  app.use(cors());
  app.use(loggingMiddleware);
  app.use(bodyParser.json());

  app.listen(config.PORT, () => {
    logger.info(`http server listening on port ${config.PORT}`);
  });

  const User = db.define("users", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    username: { type: Sequelize.STRING, unique: true, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: true },
    password: { type: Sequelize.STRING, allowNull: false },
    profilePicture: { type: Sequelize.STRING, allowNull: true }
  });

  const UserUser = db.define(
    "userUser",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userFollowerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "user", key: "id" }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "user", key: "id" }
      }
    },
    { freezeTableName: true }
  );

  const Token = db.define("tokens", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: Sequelize.STRING, allowNull: false },
    userId: { type: Sequelize.INTEGER, allowNull: false }
  });

  const Like = db.define("likes", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    postId: { type: Sequelize.INTEGER, allowNull: false },
    userId: { type: Sequelize.INTEGER, allowNull: false }
  });

  const Post = db.define("posts", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    description: { type: Sequelize.STRING, allowNull: true },
    media: { type: Sequelize.STRING, allowNull: true },
    userId: { type: Sequelize.INTEGER, allowNull: false }
  });

  User.belongsToMany(User, {
    through: "userUser",
    foreignKey: "userId",
    as: "follower"
  });
  UserUser.belongsTo(User, {
    foreignKey: "userFollowerId",
    as: "userFollower"
  });
  UserUser.belongsTo(User, { foreignKey: "userId", as: "userFollow" });
  User.belongsToMany(User, {
    through: "userUser",
    foreignKey: "userFollowerId",
    as: "user"
  });

  User.belongsToMany(Like, {
    through: Like,
    foreignKey: "likeId",
    as: "likeId"
  });
  Like.belongsTo(User, { foreignKey: "userId", as: "user" });
  Like.belongsTo(Post, { foreignKey: "postId", as: "post" });
  Post.belongsToMany(Like, {
    through: Like,
    foreignKey: "likeId",
    as: "likeId"
  });

  Token.belongsTo(User);
  User.hasMany(Post);
  Post.belongsTo(User);

  return { db, User, UserUser, Token, Like, Post };
};
