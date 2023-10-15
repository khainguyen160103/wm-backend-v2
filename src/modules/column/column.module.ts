import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { ColumnService } from './column.service'
import { ColumnController } from './column.controller'
import { Column } from './entities'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [TypeOrmModule.forFeature([Column]), AccountModule],
  controllers: [ColumnController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    ColumnService,
  ],
  exports: [ColumnService],
})
export class ColumnModule {}
