const { Op } = require("sequelize");
const { AuthenticationError, ForbiddenError } = require("apollo-server");
const { DataSource } = require("apollo-datasource");
const { v4: uuid } = require("uuid");

class InstataAPI extends DataSource {
  constructor({ models }) {
    super();
    this.models = models;
  }

  initialize(config) {
    this.context = config.context;
  }

  _forbiddenError() {
    throw new ForbiddenError();
  }

  async login(email, password) {
    const user = await this.models.User.findOne({ where: { email, password } });

    if (!user) throw new AuthenticationError();

    const token = uuid();

    try {
      await this.models.Token.create({ token, userId: user.id });
      return token;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getFeedPosts({ limit = 10, offset = 0 }) {
    if (!this.context.user.id) this._forbiddenError();

    const users = await this.models.UserUser.findAll({
      where: { userFollowerId: this.context.user.id }
    });

    const usersId = users.map(user => user.userId);

    return this.models.Post.findAll({
      limit,
      where: { userId: { [Op.or]: usersId } },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: this.models.User
        }
      ]
    });
  }

  async getLikes(post) {
    return this.models.Like.findAll({
      where: { postId: post.id },
      include: [{ model: this.models.User, as: "user" }]
    });
  }

  async addPostLike(postId) {
    if (!this.context.user.id) this._forbiddenError();

    await this.models.Like.create({ postId, userId: this.context.user.id });
    return this.models.Post.findOne({ where: { id: postId } });
  }

  async deletePostLike(postId) {
    if (!this.context.user.id) this._forbiddenError();

    const like = await this.models.Like.findOne({
      where: { postId, userId: this.context.user.id }
    });
    await like.destroy();
    return this.models.Post.findOne({ where: { id: postId } });
  }

  async getLikesCount(post) {
    return this.models.Like.count({ where: { postId: post.id } });
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

    const user = await this.models.User.findOne({ where: params });

    if (!user) throw new Error("No found user");

    return user;
  }

  async getPost(id) {
    const post = await this.models.Post.findOne({
      where: { id },
      include: [this.models.User]
    });

    if (!post) throw new Error("No content");

    return post;
  }

  async postAlreadyLiked(postId) {
    if (!this.context.user.id) return this._forbiddenError();

    const liked = await this.models.Like.findOne({
      where: { postId: postId, userId: this.context.user.id }
    });
    return Boolean(liked);
  }

  async getFollowed(userId) {
    const res = await this.models.UserUser.findAll({
      where: { userFollowerId: userId },
      include: [{ model: this.models.User, as: "userFollow" }]
    });

    return res.map(el => el.userFollow);
  }

  async getFollowedCount(userId) {
    return this.models.UserUser.count({ where: { userFollowerId: userId } });
  }

  async getFollowers(userId) {
    const res = await this.models.UserUser.findAll({
      where: { userId: userId },
      include: [{ model: this.models.User, as: "userFollower" }]
    });

    return res.map(el => el.userFollower);
  }

  async getFollowersCount(userId) {
    return this.models.UserUser.count({ where: { userId } });
  }

  async getPosts(id) {
    const userId = id || this.context.user.id;

    if (!userId) this._forbiddenError();

    return this.models.Post.findAll({
      where: { userId },
      include: { model: this.models.User }
    });
  }

  async getPostsCount(userId) {
    return this.models.Post.count({ where: { userId } });
  }

  async createPost(post) {
    if (!this.context.user.id) this._forbiddenError();

    return this.models.Post.create({ ...post, userId: this.context.user.id });
  }

  async addFollow(userId) {
    if (!this.context.user.id) this._forbiddenError();

    return this.models.UserUser.create({
      userId,
      userFollowerId: this.context.user.id
    });
  }
}

module.exports = InstataAPI;
