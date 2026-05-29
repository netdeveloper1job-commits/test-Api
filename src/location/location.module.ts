import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { EventLogModule } from 'src/event-log/event-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]),EventLogModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
