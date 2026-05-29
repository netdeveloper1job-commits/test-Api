import { Repository } from 'typeorm';
import { CreateComplianceConfigDto } from './dto/request/create-compliance-config.dto';
import { UpdateComplianceConfigDto } from './dto/request/update-compliance-config.dto';
import { ComplianceConfigWithResponse } from './dto/response/compliance-config-with-response';
import { ComplianceConfig } from './entities/compliance-config.entity';
import { EventLogService } from 'src/event-log/event-log.service';
export declare class ComplianceConfigService {
    private complianceConfigRepository;
    private readonly eventLogService;
    constructor(complianceConfigRepository: Repository<ComplianceConfig>, eventLogService: EventLogService);
    create(request: CreateComplianceConfigDto, user: any): Promise<ComplianceConfigWithResponse>;
    findAll(search: string): Promise<ComplianceConfigWithResponse>;
    findOne(id: number): Promise<ComplianceConfigWithResponse>;
    update(complianceConfigId: number, request: UpdateComplianceConfigDto, user: any): Promise<ComplianceConfigWithResponse>;
    remove(id: number, user: any): Promise<ComplianceConfigWithResponse>;
    getComplianceConfigByComplianceCategoryId(complianceCategoryId: number): Promise<ComplianceConfigWithResponse>;
}
