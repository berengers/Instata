'use strict';
const { loremIpsum } = require('lorem-ipsum');

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
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '2',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '2',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3',
    ...dates,
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3',
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
    await queryInterface.bulkInsert('Posts', posts, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
