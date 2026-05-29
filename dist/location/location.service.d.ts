import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/request/create-location.dto';
import { UpdateLocationDto } from './dto/request/update-location.dto';
import { LocationWithResponse } from './dto/response/location-with-response';
import { Location } from './entities/location.entity';
import { EventLogService } from 'src/event-log/event-log.service';
export declare class LocationService {
    private locationRepository;
    private readonly eventLogService;
    constructor(locationRepository: Repository<Location>, eventLogService: EventLogService);
    create(request: CreateLocationDto, user: any): Promise<LocationWithResponse>;
    getDaysDiffFromToday: (dueDate: string | Date) => number | null;
    findAll(search: string): Promise<LocationWithResponse>;
    findOne(id: number): Promise<LocationWithResponse>;
    update(locationId: number, request: UpdateLocationDto, user: any): Promise<LocationWithResponse>;
    remove(id: number, user: any): Promise<LocationWithResponse>;
}
