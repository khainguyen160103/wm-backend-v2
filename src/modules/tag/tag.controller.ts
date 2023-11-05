import { Controller, HttpCode, HttpStatus, Post , Body , Get , Param , Put, Delete} from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto } from './dto'
import { UpdateTagDto } from './dto/update-tag.dto'

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) { }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto : CreateTagDto) { 
    return await this.tagService.create(dto as any)
  }

  @Get('/:id_tag')
  @HttpCode(HttpStatus.FOUND)
  async get(@Param('id_tag') id: string) { 
    return await this.tagService.getByCondition({id})
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateTagDto) { 
    return await this.tagService.update(dto.id, dto);
  }

  @Delete('/:id_tag')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id_tag') id: string) {
    return await this.tagService.delete(id);
  }

}
