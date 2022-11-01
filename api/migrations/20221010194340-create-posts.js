'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      username: { type: Sequelize.STRING, unique: true, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      password: { type: Sequelize.STRING, allowNull: false },
      profilePicture: { type: Sequelize.STRING, allowNull: true },
    });

    // users.belongsToMany(users, {
    //   through: 'userSubscriptions',
    //   foreignKey: 'userFollowerId',
    //   as: 'userFollower'
    // });

    // await queryInterface.createTable(
    //   'userSubscriptions',
    //   {
    //     id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    //     userFollowerId: {
    //       type: Sequelize.INTEGER,
    //       allowNull: false,
    //       references: { model: 'user', key: 'id' },
    //     },
    //     userFollowingId: {
    //       type: Sequelize.INTEGER,
    //       allowNull: false,
    //       references: { model: 'user', key: 'id' },
    //     },
    //   },
    //   {
    //     freezeTableName: true,
    //   },
    // );

    const tokens = await queryInterface.createTable('tokens', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      token: { type: Sequelize.STRING, allowNull: false },
      userId: { type: Sequelize.INTEGER, allowNull: false },
    });

    const likes = await queryInterface.createTable('likes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      postId: { type: Sequelize.INTEGER, allowNull: false },
      userId: { type: Sequelize.INTEGER, allowNull: false },
    });

    const posts = await queryInterface.createTable('Post', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      media: { type: Sequelize.STRING, allowNull: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('blklk');
    await queryInterface.dropTable('Post');
    await queryInterface.dropTable('post');
    await queryInterface.dropTable('likes');
    await queryInterface.dropTable('tokens');
    // await queryInterface.dropTable('userSubscriptions');
    await queryInterface.dropTable('users');
  },
};
