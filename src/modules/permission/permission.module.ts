import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { PermissionRepository } from './repository/permission.repository'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRepository])],
  controllers: [PermissionController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  exports: [PermissionService],
})
export class PermissionModule {}
