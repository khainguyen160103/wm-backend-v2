import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { GroupModule } from './group/group.module'
import { PostModule } from './post/post.module'

// import entities
import { User } from './user/entities'
import { Group } from './group/entities'
import { Post, PostUser } from './post/entities'
import { Hastag } from './hastag/entities'
import { Media } from './media/entities'
import { Category } from './category/entities'
import { Comment } from './comment/entities'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

const entities: any[] = [User, Group, Hastag, Post, PostUser, Media, Category, Comment]

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.MYSQL_DATABASE,
      // entities: ['src/**/*.entity{.ts,.js}'], // get all entities
      entities,
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      logging: false,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserModule,
    GroupModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
