import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserService } from '../user/user.service';
import { Post } from './post.model';
import { PostsResolver } from './post.resolver';
import { PostsService } from './post.service';

@Module({
  imports: [SequelizeModule.forFeature([Post, User])],
  providers: [PostsService, PostsResolver, UserService],
})
export class PostsModule {}
