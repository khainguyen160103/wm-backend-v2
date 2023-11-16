import { Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { TaskFileService } from '../service/task_file.service'
import { GetCurrentUserId, Public } from 'src/common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { imageFileFilter, setFileName } from 'src/utils'

@Controller('task/file')
export class TaskFileController {
  constructor(private taskFileService: TaskFileService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: setFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const [name, type] = file.filename.split('.')

    const media = await this.taskFileService.create({
      name,
      type,
      //   path: generateFilePath(),
    })

    return media
  }

  @Get(':name')
  @Public()
  @HttpCode(HttpStatus.OK)
  async getUploadFile(@Param('name') name: string, @Res() response) {
    const file = await this.taskFileService.getOneByCondition({ name: name.trim() })
    return response.sendFile(file.name, { root: './uploads' })
  }
}
