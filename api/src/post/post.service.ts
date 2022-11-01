import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from 'src/user/user.model';
import { Post } from './post.model';

interface GetPostsOptions {
  limit?: number;
  cursor?: {
    postId: string;
    postDate: Date;
  };
}

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postModel: typeof Post,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async getPosts(
    userId: string,
    { limit = 10, cursor }: GetPostsOptions,
  ): Promise<Post[]> {
    console.log('! limit, cursor, userId --> ', limit, cursor, userId);
    const where = cursor
      ? {
          [Op.or]: [
            {
              userId,
              createdAt: { [Op.lt]: new Date(cursor.postDate) },
            },
            {
              id: { [Op.lte]: cursor.postId },
              userId,
              createdAt: new Date(cursor.postDate),
            },
          ],
        }
      : { userId };

    return this.postModel.findAll({
      where,
      limit: limit || null,
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC'],
      ],
      include: { model: this.userModel },
    });
  }
}
