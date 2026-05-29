import { ComplianceConfig } from 'src/compliance-config/entities/compliance-config.entity';
import { ComplianceTracker } from 'src/compliance-tracker/entities/compliance-tracker.entity';
import { InputDetail } from 'src/input-details/entities/input-detail.entity';
export declare class ComplianceCategory {
    id: number;
    industryTypeId: number;
    complianceCategoryName: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    industryType: InputDetail;
    complianceConfigs: ComplianceConfig[];
    complianceTrackers: ComplianceTracker[];
}
