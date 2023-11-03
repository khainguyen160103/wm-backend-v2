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
  ProjectModule,
  BoardModule,
  ColumnModule,
  SprintModule,
  TagModule,
  TaskModule,
  MailModule,
} from './modules'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { AtGuard } from './common/guards'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const modules = [
  AuthModule,
  PermissionModule,
  AccountModule,
  ProjectModule,
  BoardModule,
  ColumnModule,
  SprintModule,
  TagModule,
  TaskModule,
  MailModule,
]

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configureDb()),
    EventEmitterModule.forRoot(),
    ...modules,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }, AppService],
})
export class AppModule {}
