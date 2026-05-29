import { EventLogService } from './event-log.service';
import { UpdateEventLogDto } from './dto/request/update-event-log.dto';
import { CreateEventLogDto } from './dto/request/create-event-log.dto';
export declare class EventLogController {
    private readonly eventLogService;
    constructor(eventLogService: EventLogService);
    create(createEventLogDto: CreateEventLogDto): Promise<{
        message: string;
        data: import("./entities/event-log.entity").EventLog;
    } | undefined>;
    findAll(): Promise<{
        message: string;
        data: import("./entities/event-log.entity").EventLog[];
    } | undefined>;
    findOne(id: string): Promise<{
        message: string;
        data: import("./entities/event-log.entity").EventLog;
    }>;
    update(id: string, updateEventLogDto: UpdateEventLogDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
