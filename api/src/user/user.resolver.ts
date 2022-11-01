import { Args, Query, Resolver } from '@nestjs/graphql';
import { PublicUser, User } from 'src/graphql';
import { UserService } from './user.service';

@Resolver('user')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  async getUser(@Args('username') username: string): Promise<PublicUser> {
    console.log('username 111 --->', username);

    const res = await this.userService.getByUsername(username);
    console.log('! res --> ', res);
    return res;
  }
}
