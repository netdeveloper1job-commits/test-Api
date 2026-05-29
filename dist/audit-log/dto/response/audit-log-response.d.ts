export declare class AuditLogResponse {
    id: number;
    user_id: number;
    loginTime: Date;
    logOutTime: Date;
    loginStatus: string;
    ipAddress: string;
    deviceType: string;
    actionAccessed: string;
    createdAt?: Date;
}
