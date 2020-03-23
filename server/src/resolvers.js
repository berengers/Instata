module.exports = {
  Query: {
    feed: async (_, { limit, offset }, { dataSources }) => {
      return dataSources.instataAPI.getFeedPosts({ limit, offset });
    },
    user: async (_, { id, username }, { dataSources }) => {
      return dataSources.instataAPI.getUser({ id, username });
    },
    post: async (_, { id }, { dataSources }) => {
      return dataSources.instataAPI.getPost(id);
    },
    posts: async (_, { userId }, { dataSources }) => {
      return dataSources.instataAPI.getPosts(userId);
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
        user: like.user,
        post,
        createdAt: like.createdAt
      }));
    },
    likesCount: (post, _, { dataSources }) => {
      return dataSources.instataAPI.getLikesCount(post);
    }
  },
  PublicUser: {
    follows: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getFollowed(user.id);
    },
    followsCount: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getFollowedCount(user.id);
    },
    followers: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getFollowers(user.id);
    },
    followersCount: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getFollowersCount(user.id);
    },
    posts: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getPosts(user.id);
    },
    postsCount: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getPostsCount(user.id);
    }
  },
  Mutation: {
    login: async (_, { email, password }, { dataSources }) => {
      const token = await dataSources.instataAPI.login(email, password);
      const user = await dataSources.instataAPI.getUser({ email });
      return {
        token,
        userId: user.id,
        username: user.username,
        profilePicture: user.profilePicture
      };
    },
    addFollow: async (_, { userId }, { dataSources }) => {
      const done = await dataSources.instataAPI.addFollow(userId);

      return Boolean(done);
    },
    togglePostLike: async (_, { postId }, { dataSources }) => {
      const liked = await dataSources.instataAPI.postAlreadyLiked(postId);

      if (liked) {
        return dataSources.instataAPI.deletePostLike(postId);
      }

      return dataSources.instataAPI.addPostLike(postId);
    },
    createPost: async (_, { post }, { dataSources }) => {
      return dataSources.instataAPI.createPost(post);
    }
  }
};
