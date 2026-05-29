import { ComplianceCategory } from 'src/compliance-category/entities/compliance-category.entity';
import { Location } from 'src/location/entities/location.entity';
export declare class InputDetail {
    id: number;
    attributeType: string;
    attributeName: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    locations: Location[];
    complianceCategories: ComplianceCategory[];
}
