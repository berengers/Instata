import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  getByUsername(@Args('username') username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } });
  }
}
