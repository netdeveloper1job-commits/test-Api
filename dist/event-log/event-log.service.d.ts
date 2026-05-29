import { UpdateEventLogDto } from './dto/request/update-event-log.dto';
import { Repository } from 'typeorm';
import { EventLog } from './entities/event-log.entity';
import { CreateEventLogDto } from './dto/request/create-event-log.dto';
export declare class EventLogService {
    private eventLogRepository;
    constructor(eventLogRepository: Repository<EventLog>);
    create(request: CreateEventLogDto): Promise<{
        message: string;
        data: EventLog;
    } | undefined>;
    findAll(): Promise<{
        message: string;
        data: EventLog[];
    } | undefined>;
    findOne(id: number): Promise<{
        message: string;
        data: EventLog;
    }>;
    update(id: number, request: UpdateEventLogDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
