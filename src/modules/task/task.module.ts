import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { AccountModule } from '../account/account.module'
import { Task, TaskComment, TaskFile, TaskHasFollower, TaskTodo, TaskInColumn, TaskActivity } from './entities'

// services
import { TaskService } from './service/task.service'
import { TaskCommentService } from './service/task_comment.service'
import { TaskInColumnService } from './service/task_in_column.service'
import { TaskTodoService } from './service/task_todo.service'
import { TaskHasFollowerService } from './service/task_has_follower.service'
import { TaskActivityService } from './service/task_activity.service'
import { TaskFileService } from './service/task_file.service'

// controllers
import { TaskCommentController } from './contoller/task_comment.controller'
import { TaskController } from './contoller/task.controller'
import { TaskTodoController } from './contoller/task_todo.controller'
import { TaskFileController } from './contoller/task_file.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskComment, TaskFile, TaskTodo, TaskHasFollower, TaskInColumn, TaskActivity]),
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
    TaskHasFollowerService,
    TaskActivityService,
  ],
  exports: [
    TaskService,
    TaskCommentService,
    TaskInColumnService,
    TaskTodoService,
    TaskFileService,
    TaskHasFollowerService,
    TaskActivityService,
  ],
})
export class TaskModule {}
