import { Repository } from 'typeorm';
import { CreateComplianceCategoryDto } from './dto/request/create-compliance-category.dto';
import { UpdateComplianceCategoryDto } from './dto/request/update-compliance-category.dto';
import { ComplianceCategoryWithResponse } from './dto/response/compliance-category-with-response';
import { ComplianceCategory } from './entities/compliance-category.entity';
import { EventLogService } from 'src/event-log/event-log.service';
export declare class ComplianceCategoryService {
    private complianceCategoryRepository;
    private readonly eventLogService;
    constructor(complianceCategoryRepository: Repository<ComplianceCategory>, eventLogService: EventLogService);
    create(request: CreateComplianceCategoryDto, user: any): Promise<ComplianceCategoryWithResponse>;
    findAll(search: string): Promise<ComplianceCategoryWithResponse>;
    findOne(id: number): Promise<ComplianceCategoryWithResponse>;
    update(complianceCategoryId: number, request: UpdateComplianceCategoryDto, user: any): Promise<ComplianceCategoryWithResponse>;
    remove(id: number, user: any): Promise<ComplianceCategoryWithResponse>;
    getDaysDiffFromToday: (dueDate: string | Date) => number | null;
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
                complianceCategory: ComplianceCategory;
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
