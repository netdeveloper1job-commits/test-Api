export declare class CreateAuditLogDto {
    user_id: number;
    loginTime: Date;
    loginStatus: string;
    ipAddress: string;
    deviceType: string;
    actionAccessed: string;
    logOutTime: Date;
}
