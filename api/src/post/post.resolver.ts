import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostCursorInput, PostsResponse } from 'src/graphql';
import { UserService } from 'src/user/user.service';
import { PostsService } from './post.service';

@Resolver('posts')
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private userService: UserService,
  ) {}

  @Query()
  async posts(
    @Args('username') username: string,
    @Args('cursor') cursor: PostCursorInput,
    @Args('limit') limit: number,
  ): Promise<PostsResponse> {
    const user = await this.userService.getByUsername(username);
    const posts = await this.postsService.getPosts(user.id, {
      limit: limit + 1,
      cursor,
    });
    console.log('! posts --> ', posts);

    const hasMore = Boolean(limit && posts.length === limit + 1);
    const cursorPost = hasMore ? posts.at(-1) : null;

    return {
      posts: posts.slice(0, limit),
      cursor: cursorPost
        ? { postDate: cursorPost.createdAt, postId: cursorPost.id }
        : null,
    };
  }
}
