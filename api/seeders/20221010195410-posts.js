'use strict';
const { loremIpsum } = require('lorem-ipsum');

const { getUuid } = require('./utils/uuidManager');

const loremOptions = () => ({
  count: Math.floor(Math.random() * 3 + 1),
  units: 'paragraph',
});
const lorem = () => loremIpsum(loremOptions());
let i = 0;
const dates = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

const posts = [
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 1),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 2),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 2),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
    ...dates,
  },
  {
    id: getUuid('post', ++i),
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: getUuid('user', 3),
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
    await queryInterface.bulkInsert('Post', posts, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Post', null, {});
  },
};
