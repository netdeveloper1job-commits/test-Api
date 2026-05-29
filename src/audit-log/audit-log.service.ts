import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from 'src/common/constants/messages';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/request/create-audit-log.dto';
import { AuditLogWithResponse } from './dto/response/audit-log-with-reponse';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

async create(
  request: CreateAuditLogDto,
): Promise<AuditLogWithResponse> {

  const data = this.auditLogRepository.create({
    ...request
  });
  const result = await this.auditLogRepository.save(data);

  if (result) {
    return {
      message: `${Messages.Resource.Created} : Audit Log`,
      data: result,
    };
  }

  throw new Error('Failed to create audit log');
}
  // FIND ALL (SIMPLE)
  async findAll(): Promise<AuditLogWithResponse> {
    const result = await this.auditLogRepository.find({
      relations: ['user'],
      order: { id: 'DESC' },
    });

    return {
      message: `${Messages.Resource.Found} : Audit Log`,
      data: result,
    };
  }

  //  FIND ONE
  async findOne(id: number): Promise<AuditLogWithResponse> {
    const result = await this.auditLogRepository.findOne({
      where: { id },
    });

    if (!result) {
      throw new HttpException(
        `${Messages.Resource.NotFound} : Audit Log`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `${Messages.Resource.Found} : Audit Log`,
      data: result,
    };
  }

  //  DELETE
  async remove(id: number): Promise<AuditLogWithResponse> {
    const deleteData = await this.auditLogRepository.delete(id);

    if (deleteData.affected && deleteData.affected > 0) {
      return {
        message: `${Messages.Resource.Deleted} : Audit Log`,
      };
    }

    throw new HttpException(
      `${Messages.Resource.NotFound} : Audit Log`,
      HttpStatus.NOT_FOUND,
    );
  }

async updateAction(
  id: number,
  body: any
): Promise<AuditLogWithResponse> {

  const auditLog = await this.auditLogRepository.findOne({
    where: { id },
  });

  if (!auditLog) {
    throw new HttpException(
      `${Messages.Resource.NotFound} : Audit Log`,
      HttpStatus.NOT_FOUND,
    );
  }

  // update fields
  if (body.actionAccessed) {
    auditLog.actionAccessed = body.actionAccessed;
  }

  if (body.ipAddress) {
    auditLog.ipAddress = body.ipAddress;
  }

  if (body.logOutTime) {
    auditLog.logOutTime = body.logOutTime;
  }

  const result = await this.auditLogRepository.save(auditLog);

  return {
    message: `${Messages.Resource.Updated} : Audit Log`,
    data: result,
  };
}
}