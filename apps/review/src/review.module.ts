import { Module } from '@nestjs/common'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'
import { PostModule } from './post/post.module'
import { CategoryModule } from './category/category.module'
import { MediaModule } from './media/media.module'
import { HastagModule } from './hastag/hastag.module'
import { CommentModule } from './comment/comment.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Post, PostUserSave, PostUserStar } from './post/entities'
import { Hastag } from './hastag/entities'
import { Media } from './media/entities'
import { Category } from './category/entities'
import { Comment } from './comment/entities'

const entities: any[] = [Hastag, Post, PostUserSave, PostUserStar, Media, Category, Comment]
const schemaName = 'mr_review'

@Module({
  imports: [
    PostModule,
    CategoryModule,
    MediaModule,
    HastagModule,
    CommentModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: schemaName,
      entities, // get all entities
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      logging: false,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
