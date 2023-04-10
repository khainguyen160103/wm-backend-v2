import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { MediaService } from './media.service'
import { diskStorage } from 'multer'
import { generateFilePath, imageFileFilter, setFileName } from 'src/utils/media'

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
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

    const media = await this.mediaService.create({
      name,
      type,
      mimetype: file.mimetype,
      path: generateFilePath(),
      size: file.size,
      created_by_id: 1,
    })

    return media
  }

  @Post('upload/multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: setFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = []
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      }
      response.push(fileReponse)
    })
    return response
  }

  @Get(':imgpath')
  async getUploadFile(@Param('imgpath') path: string, @Res() response) {
    const media = await this.mediaService.getOneByCondition({ path: path.trim() })
    const image = `${media.name}.${media.type}`
    return response.sendFile(image, { root: './uploads' })
  }
}
