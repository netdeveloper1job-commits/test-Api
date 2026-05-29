import { ComplianceCategory } from 'src/compliance-category/entities/compliance-category.entity';
import { ComplianceConfig } from 'src/compliance-config/entities/compliance-config.entity';
import { Location } from 'src/location/entities/location.entity';
import { User } from 'src/users/entities/user.entity';
export declare class ComplianceTracker {
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
    location: Location;
    user: User;
    reminderSent: boolean;
    complianceCategory: ComplianceCategory;
    complianceConfig: ComplianceConfig;
}
