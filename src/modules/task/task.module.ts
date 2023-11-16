import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { TaskService } from './service/task.service'
import { AccountModule } from '../account/account.module'
import { Task, TaskComment, TaskFile, TaskHasFollower, TaskTodo, TaskInColumn } from './entities'

import { TaskCommentService } from './service/task_comment.service'
import { TaskInColumnService } from './service/task_in_column.service'
import { TaskTodoService } from './service/task_todo.service'

import { TaskCommentController } from './contoller/task_comment.controller'
import { TaskController } from './contoller/task.controller'
import { TaskTodoController } from './contoller/task_todo.controller'
import { TaskFileService } from './service/task_file.service'
import { TaskFileController } from './contoller/task_file.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskComment, TaskFile, TaskTodo, TaskHasFollower, TaskInColumn]),
    AccountModule,
  ],
  controllers: [TaskController, TaskCommentController, TaskTodoController, TaskFileController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    TaskService,
    TaskCommentService,
    TaskInColumnService,
    TaskTodoService,
    TaskFileService,
  ],
  exports: [TaskService, TaskCommentService, TaskInColumnService, TaskTodoService, TaskFileService],
})
export class TaskModule {}
