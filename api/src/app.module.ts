import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { SequelizeModule } from '@nestjs/sequelize';

import { join } from 'path';
import { PostsModule } from './post/post.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      sync: {
        force: false,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        skipResolverArgs: true,
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      debug: true,
      playground: false,
    }),
    PostsModule,
    UsersModule,
  ],
})
export class AppModule {}
