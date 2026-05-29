import { CreateComplianceCategoryDto } from './dto/request/create-compliance-category.dto';
import { UpdateComplianceCategoryDto } from './dto/request/update-compliance-category.dto';
import { ComplianceCategoryWithResponse } from './dto/response/compliance-category-with-response';
import { ComplianceCategoryService } from './compliance-category.service';
export declare class ComplianceCategoryController {
    private readonly complianceCategoryService;
    constructor(complianceCategoryService: ComplianceCategoryService);
    create(createComplianceCategoryDto: CreateComplianceCategoryDto, req: any): Promise<ComplianceCategoryWithResponse>;
    findAll(search: string): Promise<ComplianceCategoryWithResponse>;
    findOne(id: string): Promise<ComplianceCategoryWithResponse>;
    updateById(id: string, body: UpdateComplianceCategoryDto, req: any): Promise<ComplianceCategoryWithResponse>;
    remove(id: string, req: any): Promise<ComplianceCategoryWithResponse>;
    getComplianceCategoryByIndustryId(industryId: number): Promise<{
        message: string;
        data: {
            complianceTrackers: {
                trackerStatus: {
                    applied: number;
                    notApplied: number;
                    compliant: number;
                    alert: number;
                    overdue: number;
                };
                id: number;
                locationId: number;
                complianceConfigId: number;
                userId: number;
                dueDate: Date;
                status: string;
                activity: string;
                doc: string;
                complianceCategoryId: string;
                complianceCompletionDate: Date;
                complianceCertificate: string;
                createdBy: string;
                updatedBy: string;
                createdAt: Date;
                updatedAt: Date;
                location: import("../location/entities/location.entity").Location;
                user: import("../users/entities/user.entity").User;
                reminderSent: boolean;
                complianceCategory: import("./entities/compliance-category.entity").ComplianceCategory;
                complianceConfig: import("../compliance-config/entities/compliance-config.entity").ComplianceConfig;
            }[];
            totalComplianceTrackers: number;
            totalComplaints: number;
            totalOverdue: number;
            totalAlert: number;
            id: number;
            industryTypeId: number;
            complianceCategoryName: string;
            createdBy: string;
            updatedBy: string;
            createdAt: Date;
            updatedAt: Date;
            industryType: import("../input-details/entities/input-detail.entity").InputDetail;
            complianceConfigs: import("../compliance-config/entities/compliance-config.entity").ComplianceConfig[];
        }[];
    }>;
}
