import { Repository } from 'typeorm';
import { CreateInputDetailDto } from './dto/request/create-input-detail.dto';
import { UpdateInputDetailDto } from './dto/request/update-input-detail.dto';
import { InputDetailWithResponse } from './dto/response/input-detail-with-response';
import { InputDetail } from './entities/input-detail.entity';
import { EventLogService } from 'src/event-log/event-log.service';
export declare class InputDetailsService {
    private inputDetailsRepository;
    private readonly eventLogService;
    constructor(inputDetailsRepository: Repository<InputDetail>, eventLogService: EventLogService);
    create(request: CreateInputDetailDto, user: any): Promise<InputDetailWithResponse>;
    findAll(search: string): Promise<InputDetailWithResponse>;
    findOne(id: number): Promise<InputDetailWithResponse>;
    update(inputDetailId: number, request: UpdateInputDetailDto, user: any): Promise<InputDetailWithResponse>;
    remove(id: number, user: any): Promise<InputDetailWithResponse>;
}
