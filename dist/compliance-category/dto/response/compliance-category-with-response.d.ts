import { ComplianceCategoryResponse } from './compliance-category-response';
export declare class ComplianceCategoryWithResponse {
    message: string;
    data?: ComplianceCategoryResponse | ComplianceCategoryResponse[];
    constructor(message: string, data?: ComplianceCategoryResponse | ComplianceCategoryResponse[]);
}
