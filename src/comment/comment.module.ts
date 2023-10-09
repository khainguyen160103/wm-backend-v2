import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentRepository } from './repository/comment.repository'
import { UserModule } from 'src/account/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
