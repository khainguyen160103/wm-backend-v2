import { Module } from '@nestjs/common'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { MediaModule } from './media/media.module';
import { HastagModule } from './hastag/hastag.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PostModule, CategoryModule, MediaModule, HastagModule, CommentModule],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
