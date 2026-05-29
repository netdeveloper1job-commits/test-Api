import { ComplianceCategory } from 'src/compliance-category/entities/compliance-category.entity';
import { ComplianceTracker } from 'src/compliance-tracker/entities/compliance-tracker.entity';
import { InputDetail } from 'src/input-details/entities/input-detail.entity';
export declare class ComplianceConfig {
    id: number;
    industryTypeId: number;
    complianceCategoryId: number;
    complianceItem: string;
    riskCategory: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    industryType: InputDetail;
    complianceCategory: ComplianceCategory;
    complianceTrackers: ComplianceTracker[];
    complianceConfig: ComplianceTracker[];
}
