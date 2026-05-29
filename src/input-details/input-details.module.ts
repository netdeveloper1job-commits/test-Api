import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InputDetailsController } from './input-details.controller';
import { InputDetailsService } from './input-details.service';
import { InputDetail } from './entities/input-detail.entity';
import { EventLogModule } from 'src/event-log/event-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([InputDetail]) , EventLogModule],
  controllers: [InputDetailsController],
  providers: [InputDetailsService],
})
export class InputDetailsModule {}
