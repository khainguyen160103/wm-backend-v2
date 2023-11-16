import { Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { TaskFileService } from '../service/task_file.service'
import { GetCurrentUserId, Public } from 'src/common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { imageFileFilter, setFileName } from 'src/utils'

@Controller('task/file')
export class TaskFileController {
  constructor(private taskFileService: TaskFileService) {}

  @Post(':task_id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: setFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async uploadedFile(@Param('task_id') task_id: number, @UploadedFile() file: Express.Multer.File) {
    const [name, type] = file.filename.split('.')

    const media = await this.taskFileService.create({
      name,
      type,
      task_id,
    })

    return media
  }

  @Get(':name')
  @Public()
  @HttpCode(HttpStatus.OK)
  async getUploadFile(@Param('name') name: string, @Res() response) {
    const file = await this.taskFileService.getOneByCondition({ name: name.trim() })
    const media = `${file.name}.${file.type}`
    return response.sendFile(media, { root: './uploads' })
  }
}
