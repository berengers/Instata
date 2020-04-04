const { gql } = require("apollo-server");

const typeDefs = gql`
	########## SCALAR ###########
	scalar Date

	########## TYPE ###########

	type FeedCursor {
		postDate: Date!
		postId: ID!
	}

	type FeedResponse {
		cursor: FeedCursor
		hasMore: Boolean
		posts: [Post]!
	}

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

	type PostsCursor {
		postId: ID!
		postDate: Date!
	}

	type PostsResponse {
		cursor: PostsCursor!
		hasMore: Boolean!
		posts: [Post]!
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
		posts(userId: ID, cursor: PostCursorInput, limit: Int): PostsResponse!
		postsCount: Int!
		createdAt: Date!
		updatedAt: Date!
	}

	########## INPUT ###########

	input PostCursorInput {
		postId: ID!
		postDate: Date!
	}

	input PostInput {
		description: String
		media: String!
		createdAt: Date
		updatedAt: Date
	}

	input FeedCursorInput {
		postDate: Date!
		postId: ID!
	}

	########## QUERY ###########

	type Query {
		user(id: ID, username: String): PublicUser!
		post(id: ID!): Post!
		posts(userId: ID, cursor: PostCursorInput, limit: Int): PostsResponse!
		feed(limit: Int, cursor: FeedCursorInput): FeedResponse!
	}

	########## MUTATION ###########

	type Mutation {
		toggleFollow(userId: ID!): PublicUser!
		createPost(post: PostInput!): Post!
		togglePostLike(postId: ID!): Post!
		login(email: String!, password: String!): Login!
		logout(token: String!): Boolean
	}
`;

module.exports = typeDefs;
