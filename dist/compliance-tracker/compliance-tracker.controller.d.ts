import { ComplianceTrackerService } from './compliance-tracker.service';
import { CreateComplianceTrackerDto } from './dto/request/create-compliance-tracker.dto';
import { UpdateComplianceTrackerDto } from './dto/request/update-compliance-tracker.dto';
import { ComplianceTrackerWithResponse } from './dto/response/compliance-tracker-with-response';
export declare class ComplianceTrackerController {
    private readonly complianceTrackerService;
    constructor(complianceTrackerService: ComplianceTrackerService);
    create(createComplianceTrackerDto: CreateComplianceTrackerDto, req: any): Promise<ComplianceTrackerWithResponse>;
    findAll(search: string): Promise<ComplianceTrackerWithResponse>;
    findOne(id: string): Promise<ComplianceTrackerWithResponse>;
    updateById(id: string, body: UpdateComplianceTrackerDto, req: any): Promise<ComplianceTrackerWithResponse>;
    remove(id: string, req: any): Promise<ComplianceTrackerWithResponse>;
    getComplianceTrackerByComplianceCategoryId(complianceCategoryId: string): Promise<ComplianceTrackerWithResponse>;
}
