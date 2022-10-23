import { Query, Resolver } from '@nestjs/graphql';
import { PostsResponse } from 'src/graphql';
import { PostsService } from './posts.service';

@Resolver('posts')
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query()
  async posts(): Promise<PostsResponse> {
    const res = await this.postsService.getPosts();

    return {
      posts: res,
      hasMore: false,
      cursor: { postId: 'postId', postDate: new Date() },
    };
  }
}
