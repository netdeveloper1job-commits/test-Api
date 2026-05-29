import { User } from 'src/users/entities/user.entity';
export declare class AuditLog {
    id: number;
    user_id: number;
    loginTime: Date;
    logOutTime: Date;
    loginStatus: string;
    ipAddress: string;
    deviceType: string;
    actionAccessed: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
