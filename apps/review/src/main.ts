import { NestFactory } from '@nestjs/core'
import { AppModule } from '../../main/src/app.module'
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'

const logger = new Logger('Blog')

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 4000,
    },
  })
  await app.listen()
  logger.log('Running my review')
}

bootstrap()
