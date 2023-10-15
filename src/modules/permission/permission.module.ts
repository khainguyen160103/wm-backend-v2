import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { PermissionRepository } from './repository/permission.repository'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { AccountService } from '../account/account.service'
import { Permission } from './entities'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), AccountModule],
  controllers: [PermissionController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    PermissionService,
  ],
  exports: [PermissionService],
})
export class PermissionModule {}
