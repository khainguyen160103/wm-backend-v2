import { Module } from '@nestjs/common'
import { configureDb } from '../config/typeorm.config'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'

// import modules
import {
  AuthModule,
  PermissionModule,
  AccountModule,
  BoardModule,
  ColumnModule,
  SprintModule,
  TagModule,
  TaskModule,
} from './modules'

import { AtGuard } from './common/guards'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const modules = [
  AuthModule,
  PermissionModule,
  AccountModule,
  BoardModule,
  ColumnModule,
  SprintModule,
  TagModule,
  TaskModule,
]

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(configureDb()), ...modules],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }, AppService],
})
export class AppModule {}
