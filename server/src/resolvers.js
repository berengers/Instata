module.exports = {
  Query: {
    user: async (_, { id, username }, { dataSources }) => {
      const user = await dataSources.instataAPI.getUser({ id, username });
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        description: user.description,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    },
    post: async (_, { id }, { dataSources }) => {
      const post = await dataSources.instataAPI.getPost(id);

      if (!post) throw new Error("No post");

      return {
        id: post.id,
        description: post.description,
        media: post.media,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      };
    },
    posts: async (_, { userId }, { dataSources }) => {
      const posts = await dataSources.instataAPI.getPosts(userId);
      return posts.map(post => ({
        id: post.id,
        description: post.description,
        media: post.media,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }));
    }
  },
  Post: {
    liked: async (post, __, { dataSources }) => {
      const liked = await dataSources.instataAPI.postAlreadyLiked(post.id);
      return Boolean(liked);
    },
    likes: async (post, __, { dataSources }) => {
      const likes = await dataSources.instataAPI.getLikes(post);
      return likes.map(like => ({
        id: like.id,
        user: like.user, // TODO - Add service for format/validate data
        post,
        createdAt: like.createdAt
      }));
    },
    likesCount: (post, _, { dataSources }) => {
      return dataSources.instataAPI.getLikesCount(post);
    }
  },
  User: {
    follows: async (user, __, { dataSources }) => {
      const followed = await dataSources.instataAPI.getFollowed(user.id);
      return followed.map(join => ({
        id: join.userFollow.id,
        username: join.userFollow.username,
        name: join.userFollow.name,
        description: join.userFollow.description,
        profilePicture: join.userFollow.profilePicture,
        createdAt: join.userFollow.createdAt,
        updatedAt: join.userFollow.updatedAt
      }));
    },
    followsCount: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getFollowedCount(user.id);
    },
    followers: async (user, __, { dataSources }) => {
      const followers = await dataSources.instataAPI.getFollowers(user.id);
      return followers.map(join => ({
        id: join.userFollower.id,
        username: join.userFollower.username,
        name: join.userFollower.name,
        description: join.userFollower.description,
        profilePicture: join.userFollower.profilePicture,
        createdAt: join.userFollower.createdAt,
        updatedAt: join.userFollower.updatedAt
      }));
    },
    followersCount: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getFollowersCount(user.id);
    },
    posts: async (user, __, { dataSources }) => {
      const posts = await dataSources.instataAPI.getPosts(user.id);

      return posts.map(post => ({
        id: post.id,
        description: post.description,
        media: post.media,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }));
    },
    postsCount: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getPostsCount(user.id);
    }
  },
  Mutation: {
    login: async (_, { email, password }, { dataSources }) => {
      const token = await dataSources.instataAPI.login(email, password);
      const user = await dataSources.instataAPI.getUser({ email });
      return { token, userId: user.id, username: user.username };
    },
    addFollow: async (_, { userId }, { dataSources }) => {
      const done = await dataSources.instataAPI.addFollow(userId);

      return Boolean(done);
    },
    togglePostLike: async (_, { postId }, { dataSources }) => {
      const liked = await dataSources.instataAPI.postAlreadyLiked(postId);

      let post = null;

      if (liked) {
        post = await dataSources.instataAPI.deletePostLike(postId);
      } else {
        post = await dataSources.instataAPI.addPostLike(postId);
      }

      return post; // TODO - use service to format data
    },
    createPost: async (_, { post }, { dataSources }) => {
      const newPost = await dataSources.instataAPI.createPost(post);
      return {
        id: newPost.id,
        description: newPost.description,
        media: newPost.media,
        createdAt: newPost.createdAt,
        updatedAt: newPost.updatedAt
      };
    }
  }
};
