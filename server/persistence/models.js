const Sequelize = require("sequelize");

module.exports = db => {
  const User = db.define("users", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    username: { type: Sequelize.STRING, unique: true, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: true },
    password: { type: Sequelize.STRING, allowNull: false },
    profilePicture: { type: Sequelize.STRING, allowNull: true }
  });

  const UserSubscription = db.define(
    "userSubscriptions",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userFollowerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "user", key: "id" }
      },
      userFollowingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "user", key: "id" }
      }
    },
    {
      freezeTableName: true
    }
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
    description: { type: Sequelize.TEXT, allowNull: true },
    media: { type: Sequelize.STRING, allowNull: true },
    userId: { type: Sequelize.INTEGER, allowNull: false }
  });

  User.belongsToMany(User, {
    through: "userSubscriptions",
    foreignKey: "userFollowingId",
    as: "userFollowing"
  });

  UserSubscription.belongsTo(User, {
    foreignKey: "userFollowerId",
    as: "userFollower"
  });

  UserSubscription.belongsTo(User, {
    foreignKey: "userFollowingId",
    as: "userFollowing"
  });

  User.belongsToMany(User, {
    through: "userSubscriptions",
    foreignKey: "userFollowerId",
    as: "userFollower"
  });

  User.belongsToMany(Like, {
    through: Like,
    foreignKey: "likeId",
    as: "likeId"
  });

  Like.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
  });

  Like.belongsTo(Post, {
    foreignKey: "postId",
    as: "post"
  });

  Post.belongsToMany(Like, {
    through: Like,
    foreignKey: "likeId",
    as: "likeId"
  });

  Token.belongsTo(User);
  User.hasMany(Post);
  Post.belongsTo(User);

  return { User, UserSubscription, Token, Like, Post };
};
