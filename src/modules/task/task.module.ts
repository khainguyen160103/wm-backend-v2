import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { AccountModule } from '../account/account.module'
import { Task, TaskComment, TaskFile, TaskHasFollower, TaskTodo, TaskInColumn } from './entities'
import { TaskCommentService } from './task_comment.service'
import { TaskCommentController } from './task_comment.controller'
import { TaskInColumnService } from './task_in_column.service'
import { TaskTodoService } from './task_todo.service'
import { TaskTodoController } from './task_todo.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskComment, TaskFile, TaskTodo, TaskHasFollower, TaskInColumn]),
    AccountModule,
  ],
  controllers: [TaskController, TaskCommentController, TaskTodoController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    TaskService,
    TaskCommentService,
    TaskInColumnService,
    TaskTodoService,
  ],
  exports: [TaskService, TaskCommentService, TaskInColumnService, TaskTodoService],
})
export class TaskModule {}
