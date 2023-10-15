import { Module } from '@nestjs/common'
import { configureDb } from '../config/typeorm.config'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'

// import Module
import { AtGuard } from './common/guards'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(configureDb())],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }, AppService],
})
export class AppModule {}
