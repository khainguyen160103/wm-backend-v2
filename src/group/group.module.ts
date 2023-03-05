import { Module } from '@nestjs/common'
import { GroupService } from './group.service'
import { GroupController } from './group.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupRepository } from './repository/group.repository'

@Module({
  imports: [TypeOrmModule.forFeature([GroupRepository])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
