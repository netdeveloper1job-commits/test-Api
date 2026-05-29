import { AuditLogService } from './audit-log.service';
import { CreateAuditLogDto } from './dto/request/create-audit-log.dto';
export declare class AuditLogController {
    private readonly auditLogService;
    constructor(auditLogService: AuditLogService);
    create(createAuditLogDto: CreateAuditLogDto): Promise<import("./dto/response/audit-log-with-reponse").AuditLogWithResponse>;
    findAll(search: string): Promise<import("./dto/response/audit-log-with-reponse").AuditLogWithResponse>;
    findOne(id: string): Promise<import("./dto/response/audit-log-with-reponse").AuditLogWithResponse>;
    remove(id: string): Promise<import("./dto/response/audit-log-with-reponse").AuditLogWithResponse>;
    updateAction(id: string, body: any): Promise<import("./dto/response/audit-log-with-reponse").AuditLogWithResponse>;
}
