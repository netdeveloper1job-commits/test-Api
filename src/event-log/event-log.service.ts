import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateEventLogDto } from './dto/request/update-event-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventLog } from './entities/event-log.entity';
import { CreateEventLogDto } from './dto/request/create-event-log.dto';
import { Messages } from 'src/common/constants/messages';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLog) private eventLogRepository: Repository<EventLog>,
  ) {}

  async create(request: CreateEventLogDto) {
    const data = this.eventLogRepository.create(request);
    const result = await this.eventLogRepository.save(data);
    if (result) {
      return {
        message: `${Messages.Resource.Created} : Event Log`,
        data: result,
      };
    }
  }

  async findAll() {
    const result = await this.eventLogRepository.find();
    if (result) {
      return {
        message: `${Messages.Resource.Found} : Event Logs`,
        data: result,
      };
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.eventLogRepository.findOne({
        where: { id },
      });
      if (!result) {
        throw new HttpException(`${Messages.Resource.NotFound} : Event Log`, HttpStatus.NOT_FOUND);
      }
      return {
        message: `${Messages.Resource.Found} : Event Log`,
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, request: UpdateEventLogDto) {
    const data = await this.eventLogRepository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException(`${Messages.Resource.NotFound} : Event Log`, HttpStatus.NOT_FOUND);
    }
    await this.eventLogRepository.update(id, request);
    return {
      message: `${Messages.Resource.Updated} : Event Log`,
    };
  }

  async remove(id: number) {
    try {
      const deleteData = await this.eventLogRepository.delete(id);
      if ((deleteData?.affected ?? 0) > 0) {
        return {
          message: `${Messages.Resource.Deleted} : Event Log`,
        };
      } else {
        throw new HttpException(`${Messages.Resource.NotFound} : Event Log`, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
