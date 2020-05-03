const { loremIpsum } = require('lorem-ipsum');

const loremOptions = () => ({
  count: Math.floor(Math.random() * 3 + 1),
  units: 'paragraph'
});
const lorem = () => loremIpsum(loremOptions());

const config = require('./config');
const db = require('./persistence/store')(config.DB);
const {
  User,
  UserSubscription,
  Token,
  Post,
  Like
} = require('./persistence/models')(db);

const users = [
  {
    email: 'tom@gmail.com',
    password: 'tom_pass',
    username: 'Toto',
    name: 'Tom Pouce',
    description: lorem(),
    profilePicture: 'https://picsum.photos/id/237/200/300'
  },
  {
    email: 'pierre@gmail.com',
    password: 'pierre_pass',
    username: 'Pipi',
    name: 'Pierre Boilan',
    description: lorem(),
    profilePicture: 'https://picsum.photos/id/1025/200/300'
  },
  {
    email: 'robert@gmail.com',
    password: 'robert_pass',
    username: 'Kiloulou',
    name: 'Natalia',
    profilePicture: 'https://picsum.photos/id/1026/200/300'
  },
  {
    email: 'john@gmail.com',
    password: 'john_pass',
    username: 'DODO',
    name: 'John',
    profilePicture: 'https://picsum.photos/id/1027/200/300'
  }
];

const userSubscriptions = [
  { userFollowerId: 1, userFollowingId: 2 },
  { userFollowerId: 1, userFollowingId: 4 },
  { userFollowerId: 2, userFollowingId: 1 },
  { userFollowerId: 3, userFollowingId: 1 },
  { userFollowerId: 4, userFollowingId: 1 }
];

const authTokens = [
  { token: 'tom_token', userId: 1 },
  { token: 'pierre_token', userId: 2 },
  { token: 'robert_token', userId: 3 },
  { token: 'john_token', userId: 4 }
];

let i = 1050;
const posts = [
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '1'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '2'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '2'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3'
  },
  {
    description: lorem(),
    media: `https://picsum.photos/id/${(i += 1)}/800/800`,
    userId: '3'
  }
];

const likes = [
  { userId: 1, postId: 1 },
  { userId: 1, postId: 2 },
  { userId: 1, postId: 3 }
];

db.sync({ force: true })
  .then(() => User.bulkCreate(users))
  .then(() => UserSubscription.bulkCreate(userSubscriptions))
  .then(() => Token.bulkCreate(authTokens))
  .then(() => Post.bulkCreate(posts))
  .then(() => Like.bulkCreate(likes))
  .then(() => {
    console.log('Fixtures inserted <------------------');
    process.exit();
  });
