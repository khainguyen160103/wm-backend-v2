import { Module } from '@nestjs/common';
import { HastagService } from './hastag.service';
import { HastagController } from './hastag.controller';

@Module({
  controllers: [HastagController],
  providers: [HastagService]
})
export class HastagModule {}
