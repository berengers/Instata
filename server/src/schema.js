const { gql } = require("apollo-server");

const typeDefs = gql`
  ########## SCALAR ###########
  scalar Date

  ########## TYPE ###########

  type Like {
    id: ID!
    user: User!
    post: Post!
    createdAt: Date
    updatedAt: Date
  }

  type Post {
    id: ID!
    description: String
    media: String!
    liked: Boolean!
    likes: [Like]
    likesCount: Int
    createdAt: Date
    updatedAt: Date
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    description: String
    profilPicture: String
    likes: [Like]
    follows: [User]
    followsCount: Int!
    followers: [User] ## create an other type without personal data or limit with a code
    followersCount: Int!
    posts: [Post]!
    postsCount: Int!
    createdAt: Date
    updatedAt: Date
  }

  ########## INPUT ###########

  input PostInput {
    description: String
    media: String!
    createdAt: Date
    updatedAt: Date
  }

  ########## QUERY ###########

  type Query {
    user(id: ID): User
    post(id: ID!): Post
    posts(userId: ID): [Post]
  }

  ########## MUTATION ###########

  type Mutation {
    addFollow(userId: ID!): Boolean
    createPost(post: PostInput!): Post
    togglePostLike(postId: ID!): Post
    login(email: String!, password: String!): String #login token
  }
`;

module.exports = typeDefs;
