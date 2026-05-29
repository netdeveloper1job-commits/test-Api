import { AuditLogResponse } from './audit-log-response';
export declare class AuditLogWithResponse {
    message: string;
    data?: AuditLogResponse | AuditLogResponse[];
    constructor(message: string, data?: AuditLogResponse | AuditLogResponse[]);
}
