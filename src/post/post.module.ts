import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post, PostUser } from './entities'
import { UserModule } from 'src/user/user.module'
import { PostUserService } from './post_user.service'

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostUser]), UserModule],
  controllers: [PostController],
  providers: [PostService, PostUserService],
  exports: [PostService, PostUserService],
})
export class PostModule {}
