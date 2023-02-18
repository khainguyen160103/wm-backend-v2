import { Controller } from '@nestjs/common';
import { HastagService } from './hastag.service';

@Controller('hastag')
export class HastagController {
  constructor(private readonly hastagService: HastagService) {}
}
