import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GroupModule } from './group/group.module'
import { Post, PostUserSave, PostUserStar } from './post/entities'
import { Hastag } from './hastag/entities'
import { Media } from './media/entities'
import { Category } from './category/entities'
import { Comment } from './comment/entities'

// import entities
import { User } from './user/entities'
import { Group } from './group/entities'
import { PostModule } from './post/post.module'

const entities: any[] = [
  User,
  Group, 
  Hastag, 
  Post, 
  PostUserSave, 
  PostUserStar, 
  Media, 
  Category, 
  Comment
]

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
    GroupModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
