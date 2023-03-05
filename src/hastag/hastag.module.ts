import { Module } from '@nestjs/common'
import { HastagService } from './hastag.service'
import { HastagController } from './hastag.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HastagRepository } from './repository/hastag.repository'

@Module({
  imports: [TypeOrmModule.forFeature([HastagRepository])],
  controllers: [HastagController],
  providers: [HastagService],
})
export class HastagModule {}
