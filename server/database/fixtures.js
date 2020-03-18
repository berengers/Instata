const { createStore } = require("./app");

const { db, User, UserUser, Token, Post, Like } = createStore();

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

const userUser = [
  { userFollowerId: 1, userId: 2 },
  { userFollowerId: 1, userId: 4 },
  { userFollowerId: 2, userId: 1 },
  { userFollowerId: 3, userId: 1 },
  { userFollowerId: 4, userId: 1 }
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
  }
];

const likes = [
  { userId: 1, postId: 1 },
  { userId: 1, postId: 2 },
  { userId: 1, postId: 3 }
];

db.sync({ force: false })
  .then(() => {
    Promise.all(users.map(user => User.create(user)));
  })
  .then(() => {
    Promise.all(userUser.map(join => UserUser.create(join)));
  })
  .then(() => {
    Promise.all(authTokens.map(post => Token.create(post)));
  })
  .then(() => {
    Promise.all(posts.map(token => Post.create(token)));
  })
  .then(() => {
    Promise.all(likes.map(like => Like.create(like)));
  })
  .then(() => {
    console.log("fixtures inserted <------------------");
  });
