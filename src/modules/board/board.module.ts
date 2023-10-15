import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { BoardService } from './board.service'
import { BoardController } from './board.controller'
import { Board } from './entities'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AccountModule],
  controllers: [BoardController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    BoardService,
  ],
  exports: [BoardService],
})
export class BoardModule {}
