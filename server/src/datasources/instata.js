const { AuthenticationError, ForbiddenError } = require('apollo-server');
const { DataSource } = require('apollo-datasource');
const { v4: uuid } = require('uuid');

class InstataAPI extends DataSource {
  constructor({store}) {
    super();
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  _forbiddenError() {
    throw new ForbiddenError()
  }

  async login(email, password) {
    const user = await this.store.User.findOne({ where: { email, password } });

    if (!user) throw new AuthenticationError();

    const token = uuid();

    try {
      await this.store.Token.create({ token, userId: user.id })
      return token
    } catch (e) {
      throw new Error(e)
    }
  }

  async getUser(id) {
    const userId = id || this.context.user.id;

    if (!userId) this._forbiddenError();

    const user = await this.store.User.findOne({ where: { id: userId } });

    if(!user) throw new Error('No found user');

    return user
  }

  async getPost(id) {
    const post = await this.store.Post.findOne({ where: { id } });

    if (!post) throw new Error('No content');

    return post
  }

  async getFollowed(user) {
    return this.store.UserUser.findAll({
      where: { userFollowerId: user.id },
      include: [{ model: this.store.User, as: 'userFollow' }]
    });
  }

  async getFollowedCount(user) {
    return this.store.UserUser.count({ where: { userFollowerId: user.id } });
  }

  async getFollowers(user) {
    return this.store.UserUser.findAll({
      where: { userId: user.id },
      include: [{ model: this.store.User, as: 'userFollower' }]
    });
  }

  async getFollowersCount(user) {
    return this.store.UserUser.count({ where: { userId: user.id } });
  }


  async getUserPosts(id) {
    const userId = id || this.context.user.id;

    if (!userId) this._forbiddenError();

    const posts = await this.store.Post.findAll({ where: { userId } });

    if (!posts) throw new Error('Strange');

    return posts
  }

  async createPost(post) {
    if (!this.context.user.id) this._forbiddenError();

    return this.store.Post.create({ ...post, userId: this.context.user.id });
  }


  async addFollow(userId) {
    if (!this.context.user.id) this._forbiddenError();

    return this.store.UserUser.create({userId, userFollowerId: this.context.user.id});
  }
}

module.exports = InstataAPI;