const { gql } = require("apollo-server");

const typeDefs = gql`
  ########## SCALAR ###########
  scalar Date

  ########## TYPE ###########

  type Like {
    id: ID!
    user: PublicUser!
    post: Post!
    createdAt: Date!
    updatedAt: Date!
  }

  type Login {
    token: String!
    user: PublicUser!
  }

  type Post {
    id: ID!
    description: String
    media: String!
    liked: Boolean!
    likes: [Like]!
    likesCount: Int!
    user: PublicUser!
    createdAt: Date!
    updatedAt: Date!
  }

  type PublicUser {
    id: ID!
    username: String!
    name: String!
    description: String
    profilePicture: String
    isFollowed: Boolean
    follows: [PublicUser]!
    followsCount: Int!
    followers: [PublicUser]!
    followersCount: Int!
    posts: [Post]!
    postsCount: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  ########## INPUT ###########

  input PostInput {
    description: String
    media: String!
    createdAt: Date!
    updatedAt: Date!
  }

  ########## QUERY ###########

  type Query {
    user(id: ID, username: String): PublicUser!
    post(id: ID!): Post!
    posts(userId: ID): [Post]!
    feed(limit: Int, offset: Int): [Post]!
  }

  ########## MUTATION ###########

  type Mutation {
    toggleFollow(userId: ID!): PublicUser!
    createPost(post: PostInput!): Post!
    togglePostLike(postId: ID!): Post!
    login(email: String!, password: String!): Login!
    logout(userId: Int!): Boolean
  }
`;

module.exports = typeDefs;
