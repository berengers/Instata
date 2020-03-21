const { Op } = require("sequelize");
const { AuthenticationError, ForbiddenError } = require("apollo-server");
const { DataSource } = require("apollo-datasource");
const { v4: uuid } = require("uuid");

class InstataAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  _forbiddenError() {
    throw new ForbiddenError();
  }

  async login(email, password) {
    const user = await this.store.User.findOne({ where: { email, password } });

    if (!user) throw new AuthenticationError();

    const token = uuid();

    try {
      await this.store.Token.create({ token, userId: user.id });
      return token;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getFeedPosts({ limit = 10, offset = 0 }) {
    if (!this.context.user.id) this._forbiddenError();

    const users = await this.store.UserUser.findAll({
      where: { userFollowerId: this.context.user.id }
    });

    const usersId = users.map(user => user.userId);

    return this.store.Post.findAll({
      limit,
      where: { userId: { [Op.or]: usersId } },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: this.store.User
        }
      ]
    });
  }

  async getLikes(post) {
    return this.store.Like.findAll({
      where: { postId: post.id },
      include: [{ model: this.store.User, as: "user" }]
    });
  }

  async addPostLike(postId) {
    if (!this.context.user.id) this._forbiddenError();

    await this.store.Like.create({ postId, userId: this.context.user.id });
    return this.store.Post.findOne({ where: { id: postId } });
  }

  async deletePostLike(postId) {
    if (!this.context.user.id) this._forbiddenError();

    const like = await this.store.Like.findOne({
      where: { postId, userId: this.context.user.id }
    });
    await like.destroy();
    return this.store.Post.findOne({ where: { id: postId } });
  }

  async getLikesCount(post) {
    return this.store.Like.count({ where: { postId: post.id } });
  }

  async getUser({ id, username, email }) {
    const params = {};

    if (id) {
      params.id = id;
    } else if (username) {
      params.username = username;
    } else if (email) {
      params.email = email;
    } else if (this.context.user.id) {
      params.id = this.context.user.id;
    } else {
      this._forbiddenError();
    }

    const user = await this.store.User.findOne({ where: params });

    if (!user) throw new Error("No found user");

    return user;
  }

  async getPost(id) {
    if (!this.context.user.id) return this._forbiddenError();

    const post = await this.store.Post.findOne({ where: { id } });

    if (!post) throw new Error("No content");

    return post;
  }

  async postAlreadyLiked(postId) {
    if (!this.context.user.id) return this._forbiddenError();

    const liked = await this.store.Like.findOne({
      where: { postId: postId, userId: this.context.user.id }
    });
    return Boolean(liked);
  }

  async getFollowed(userId) {
    return this.store.UserUser.findAll({
      where: { userFollowerId: userId },
      include: [{ model: this.store.User, as: "userFollow" }]
    });
  }

  async getFollowedCount(userId) {
    return this.store.UserUser.count({ where: { userFollowerId: userId } });
  }

  async getFollowers(userId) {
    return this.store.UserUser.findAll({
      where: { userId: userId },
      include: [{ model: this.store.User, as: "userFollower" }]
    });
  }

  async getFollowersCount(userId) {
    return this.store.UserUser.count({ where: { userId } });
  }

  async getPosts(id) {
    const userId = id || this.context.user.id;

    if (!userId) this._forbiddenError();

    const posts = await this.store.Post.findAll({ where: { userId } });

    if (!posts) throw new Error("Strange");

    return posts;
  }

  async getPostsCount(userId) {
    return this.store.Post.count({ where: { userId } });
  }

  async createPost(post) {
    if (!this.context.user.id) this._forbiddenError();

    return this.store.Post.create({ ...post, userId: this.context.user.id });
  }

  async addFollow(userId) {
    if (!this.context.user.id) this._forbiddenError();

    return this.store.UserUser.create({
      userId,
      userFollowerId: this.context.user.id
    });
  }
}

module.exports = InstataAPI;
