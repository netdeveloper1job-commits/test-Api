import { ComplianceConfigService } from './compliance-config.service';
import { CreateComplianceConfigDto } from './dto/request/create-compliance-config.dto';
import { UpdateComplianceConfigDto } from './dto/request/update-compliance-config.dto';
import { ComplianceConfigWithResponse } from './dto/response/compliance-config-with-response';
export declare class ComplianceConfigController {
    private readonly complianceConfigService;
    constructor(complianceConfigService: ComplianceConfigService);
    create(createComplianceConfigDto: CreateComplianceConfigDto, req: any): Promise<ComplianceConfigWithResponse>;
    findAll(search: string): Promise<ComplianceConfigWithResponse>;
    findOne(id: string): Promise<ComplianceConfigWithResponse>;
    updateById(id: string, body: UpdateComplianceConfigDto, req: any): Promise<ComplianceConfigWithResponse>;
    remove(id: string, req: any): Promise<ComplianceConfigWithResponse>;
    getComplianceConfigByComplianceCategoryId(complianceCategoryId: string): Promise<ComplianceConfigWithResponse>;
}
