module.exports = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      const user = await dataSources.instataAPI.getUser(id);
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        nickName: user.nickName,
        profilPicture: user.profilPicture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    },
    post: async (_, { id }, { dataSources }) => {
      const post = await dataSources.instataAPI.getPost(id);

      if(!post) throw new Error('No post');

      return {
        id: post.id,
        description: post.description,
        media: post.media,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }
    },
    posts: async (_, { userId }, { dataSources }) => {
      const posts = await dataSources.instataAPI.getUserPosts(userId);
      return posts.map(post => ({
        id: post.id,
        description: post.description,
        media: post.media,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }))
    }
  },
  User: {
    follows: async (user, __, { dataSources }) => {
      const followed = await dataSources.instataAPI.getFollowed(user);
      return followed.map(join => ({
          id: join.userFollow.id,
          firstName: join.userFollow.firstName,
          lastName: join.userFollow.lastName,
          nickName: join.userFollow.nickName,
          profilPicture: join.userFollow.profilPicture,
          createdAt: join.userFollow.createdAt,
          updatedAt: join.userFollow.updatedAt
      }))
    },
    followsCount: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getFollowedCount(user);
    },
    followers: async (user, __, { dataSources }) => {
      const followers = await dataSources.instataAPI.getFollowers(user);
      return followers.map(join => ({
        id: join.userFollower.id,
        firstName: join.userFollower.firstName,
        lastName: join.userFollower.lastName,
        nickName: join.userFollower.nickName,
        profilPicture: join.userFollower.profilPicture,
        createdAt: join.userFollower.createdAt,
        updatedAt: join.userFollower.updatedAt
      }))
    },
    followersCount: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getFollowersCount(user)
    }
  },
  Mutation: {
    login: async (_, { email, password }, { dataSources }) => {
      return dataSources.instataAPI.login(email, password);
    },
    addFollow: async (_, { userId }, { dataSources }) => {
      const done = await dataSources.instataAPI.addFollow(userId);

      return Boolean(done)
    },
    createPost: async (_, { post }, { dataSources }) => {
      const newPost = await dataSources.instataAPI.createPost(post);
      return {
        id: newPost.id,
        description: newPost.description,
        media: newPost.media,
        createdAt: newPost.createdAt,
        updatedAt: newPost.updatedAt
      }
    }
  }
};