import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { AccountModule } from '../account/account.module'
import { Task, TaskComment, TaskFile, TaskHasFollower, TaskTodo } from './entities'
import { TaskInColumn } from './entities/task_in_column.entity'
import { TaskCommentService } from './task_comment.service'
import { TaskCommentController } from './task_comment.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskComment, TaskFile, TaskTodo, TaskHasFollower, TaskInColumn]),
    AccountModule,
  ],
  controllers: [TaskController, TaskCommentController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    TaskService,
    TaskCommentService,
  ],
  exports: [TaskService, TaskCommentService],
})
export class TaskModule {}
