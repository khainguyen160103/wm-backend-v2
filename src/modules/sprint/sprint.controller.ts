import { Controller } from '@nestjs/common'
import { SprintService } from './sprint.service'

@Controller('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}
}
