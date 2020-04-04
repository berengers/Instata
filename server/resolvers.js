module.exports = {
  Query: {
    feed: async (_, { limit, cursor }, { dataSources }) => {
      const posts = await dataSources.instataAPI.getFeedPosts({
        limit: limit ? limit + 1 : undefined,
        cursor
      });

      if (posts.length === 0) return { hasMore: false, posts: [] };

      const hasMore = Boolean(posts.length === limit + 1);
      const newCursor = {
            postId: posts[posts.length - (hasMore ? 2 : 1)].id,
            postDate: posts[posts.length - (hasMore ? 2 : 1)].createdAt
          }

      return {
        cursor: newCursor,
        hasMore,
        posts: posts.slice(0, limit)
      };
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
    isFollowed: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.isFollowed(user.id);
    },
    posts: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getPosts(user.id);
    },
    postsCount: async (user, __, { dataSources }) => {
      return dataSources.instataAPI.getPostsCount(user.id);
    }
  },
  Mutation: {
    createPost: async (_, { post }, { dataSources }) => {
      const newPost = await dataSources.instataAPI.createPost(post);

      return dataSources.instataAPI.getPost(newPost.id);
    },
    login: async (_, { email, password }, { dataSources }) => {
      const token = await dataSources.instataAPI.login(email, password);
      const user = await dataSources.instataAPI.getUser({ email });
      return {
        token,
        user
      };
    },
    logout: async (_, { token }, { dataSources }) => {
      await dataSources.instataAPI.logout(token);
    },
    toggleFollow: async (_, { userId }, { dataSources }) => {
      const isFollowed = await dataSources.instataAPI.isFollowed(userId);

      if (isFollowed) {
        return dataSources.instataAPI.deleteFollow(userId);
      }

      return dataSources.instataAPI.addFollow(userId);
    },
    togglePostLike: async (_, { postId }, { dataSources }) => {
      const liked = await dataSources.instataAPI.postAlreadyLiked(postId);

      if (liked) {
        return dataSources.instataAPI.deletePostLike(postId);
      }

      return dataSources.instataAPI.addPostLike(postId);
    }
  }
};
