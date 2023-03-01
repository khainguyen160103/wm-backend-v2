import { Controller } from '@nestjs/common'
import { Crud } from '@nestjsx/crud'
import { Post } from './entities'
import { PostService } from './post.service'

@Crud({
  model: {
    type: Post,
  },
})
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
}
