import { Repository } from 'typeorm';
import { CreateComplianceTrackerDto } from './dto/request/create-compliance-tracker.dto';
import { UpdateComplianceTrackerDto } from './dto/request/update-compliance-tracker.dto';
import { ComplianceTrackerWithResponse } from './dto/response/compliance-tracker-with-response';
import { ComplianceTracker } from './entities/compliance-tracker.entity';
import { EventLogService } from 'src/event-log/event-log.service';
export declare class ComplianceTrackerService {
    private complianceTrackerRepository;
    private readonly eventLogService;
    constructor(complianceTrackerRepository: Repository<ComplianceTracker>, eventLogService: EventLogService);
    create(request: CreateComplianceTrackerDto, user: any): Promise<ComplianceTrackerWithResponse>;
    findAll(search: string): Promise<ComplianceTrackerWithResponse>;
    findOne(id: number): Promise<ComplianceTrackerWithResponse>;
    update(complianceTrackerId: number, request: UpdateComplianceTrackerDto, user: any): Promise<ComplianceTrackerWithResponse>;
    remove(id: number, user: any): Promise<ComplianceTrackerWithResponse>;
    getComplianceTrackerByComplianceCategoryId(complianceCategoryId: number): Promise<ComplianceTrackerWithResponse>;
}
