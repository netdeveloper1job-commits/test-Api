import { InputDetail } from 'src/input-details/entities/input-detail.entity';
export declare class Location {
    id: number;
    location: string;
    address: string;
    industryTypeId: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    industryType: InputDetail;
}
