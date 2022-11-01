'use strict';
const { getUuid } = require('./utils/uuidManager');

const dates = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

const users = [
  {
    id: getUuid('user', 1),
    email: 'email1',
    username: 'username1',
    name: 'name',
    password: 'password',
    ...dates,
  },
  {
    id: getUuid('user', 2),
    email: 'email2',
    username: 'username2',
    name: 'name',
    password: 'password',
    ...dates,
  },
  {
    id: getUuid('user', 3),
    email: 'email3',
    username: 'username3',
    name: 'name',
    password: 'password',
    ...dates,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('User', users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User', null, {});
  },
};
