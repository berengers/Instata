const config = require("./config");
const db = require("./persistence/store")(config.DB);
const {
  User,
  UserSubscription,
  Token,
  Post,
  Like
} = require("./persistence/models")(db);

const users = [
  {
    email: "tom@gmail.com",
    password: "tom_pass",
    username: "Toto",
    name: "Tom Pouce",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod lacus sem, laoreet gravida felis pellentesque id. In quis placerat leo. Donec in purus ac orci pellentesque lacinia.",
    profilePicture: "https://picsum.photos/id/237/200/300"
  },
  {
    email: "pierre@gmail.com",
    password: "pierre_pass",
    username: "Pipi",
    name: "Pierre Boilan",
    description:
      "Ut quis elementum risus. Maecenas vel augue consectetur, consectetur tellus ultrices, auctor ex. Nam rhoncus, risus sit amet molestie lobortis, est magna mollis diam, vel volutpat magna orci at velit. Donec fermentum quam quis odio varius, a tempus sem fermentum.",
    profilePicture: "https://picsum.photos/id/1025/200/300"
  },
  {
    email: "robert@gmail.com",
    password: "robert_pass",
    username: "Kiloulou",
    name: "Natalia",
    profilePicture: "https://picsum.photos/id/1026/200/300"
  },
  {
    email: "john@gmail.com",
    password: "john_pass",
    username: "DODO",
    name: "John",
    profilePicture: "https://picsum.photos/id/1027/200/300"
  }
];

const userSubscriptions = [
  { userFollowerId: 1, userFollowingId: 2 },
  { userFollowerId: 1, userFollowingId: 4 },
  { userFollowerId: 2, userFollowingId: 1 },
  { userFollowerId: 3, userFollowingId: 1 },
  { userFollowerId: 4, userFollowingId: 1 }
];

const authTokens = [{ token: "tom_token", userId: 1 }];

const posts = [
  {
    description: "post 1 - user 1",
    media: "https://picsum.photos/id/1022/800/800",
    userId: "1"
  },
  {
    description: "post 2 - user 1",
    media: "https://picsum.photos/id/1023/800/800",
    userId: "1"
  },
  {
    description: "post 3 - user 1",
    media: "https://picsum.photos/id/1024/800/800",
    userId: "1"
  },
  {
    description: "post 4 - user 1",
    media: "https://picsum.photos/id/1025/800/800",
    userId: "1"
  },
  {
    description: "post 5 - user 1",
    media: "https://picsum.photos/id/1026/800/800",
    userId: "1"
  },
  {
    description: "post 6 - user 1",
    media: "https://picsum.photos/id/1027/800/800",
    userId: "1"
  },
  {
    description: "post 7 - user 1",
    media: "https://picsum.photos/id/1028/800/800",
    userId: "1"
  },
  {
    description: "post 8 - user 1",
    media: "https://picsum.photos/id/1029/800/800",
    userId: "1"
  },
  {
    description: "post 1 - user 2",
    media: "https://picsum.photos/id/1031/800/800",
    userId: "2"
  },
  {
    description: "post 2 - user 2",
    media: "https://picsum.photos/id/1032/800/800",
    userId: "2"
  },
  {
    description: "post - user 3",
    media: "https://picsum.photos/id/1027/800/800",
    userId: "3"
  },
  {
    description: "post - user 3",
    media: "https://picsum.photos/id/1028/800/800",
    userId: "3"
  },
  {
    description: "post - user 3",
    media: "https://picsum.photos/id/1029/800/800",
    userId: "3"
  },
  {
    description: "post - user 3",
    media: "https://picsum.photos/id/1031/800/800",
    userId: "3"
  },
  {
    description: "post - user 3",
    media: "https://picsum.photos/id/1032/800/800",
    userId: "3"
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
    console.log("Fixtures inserted <------------------");
    process.exit();
  });
