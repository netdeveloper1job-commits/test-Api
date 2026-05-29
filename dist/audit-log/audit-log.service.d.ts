import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/request/create-audit-log.dto';
import { AuditLogWithResponse } from './dto/response/audit-log-with-reponse';
export declare class AuditLogService {
    private auditLogRepository;
    constructor(auditLogRepository: Repository<AuditLog>);
    create(request: CreateAuditLogDto): Promise<AuditLogWithResponse>;
    findAll(): Promise<AuditLogWithResponse>;
    findOne(id: number): Promise<AuditLogWithResponse>;
    remove(id: number): Promise<AuditLogWithResponse>;
    updateAction(id: number, body: any): Promise<AuditLogWithResponse>;
}
