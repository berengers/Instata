import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from './posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts) private postModel: typeof Posts) {}
  async getPosts(): Promise<Posts[]> {
    const res = await this.postModel.findAll();
    // console.log('res --->', res);
    return res;
  }
}
