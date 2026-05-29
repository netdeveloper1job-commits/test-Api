import { ComplianceConfigResponse } from './compliance-config-response';
export declare class ComplianceConfigWithResponse {
    message: string;
    data?: ComplianceConfigResponse | ComplianceConfigResponse[];
    constructor(message: string, data?: ComplianceConfigResponse | ComplianceConfigResponse[]);
}
