import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Posts])],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
