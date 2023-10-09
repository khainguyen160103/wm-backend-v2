import { Module } from '@nestjs/common'
import { configureDb } from '../config/typeorm.config'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'

// import Module
import { UserModule } from './account/account.module'
import { MediaModule } from './media/media.module'
import { CategoryModule } from './category/category.module'
import { CommentModule } from './comment/comment.module'
import { GroupModule } from './group/group.module'
import { HastagModule } from './hastag/hastag.module'
import { PostModule } from './post/post.module'
import { AuthModule } from './auth/auth.module'
import { AtGuard } from './common/guards'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configureDb()),
    UserModule,
    MediaModule,
    CategoryModule,
    CommentModule,
    GroupModule,
    HastagModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }, AppService],
})
export class AppModule {}
