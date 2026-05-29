import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/common/constants/messages';
import { Brackets, Repository } from 'typeorm';
import { CreateComplianceTrackerDto } from './dto/request/create-compliance-tracker.dto';
import { UpdateComplianceTrackerDto } from './dto/request/update-compliance-tracker.dto';
import { ComplianceTrackerWithResponse } from './dto/response/compliance-tracker-with-response';
import { ComplianceTracker } from './entities/compliance-tracker.entity';
import { EventLogService } from 'src/event-log/event-log.service';

@Injectable()
export class ComplianceTrackerService {
  constructor(
    @InjectRepository(ComplianceTracker)
    private complianceTrackerRepository: Repository<ComplianceTracker>,private readonly eventLogService: EventLogService,
  ) {}

async create(
  request: CreateComplianceTrackerDto,
  user: any,
): Promise<ComplianceTrackerWithResponse> {

  if (request.activity === 'Compliant') {
    request.status = 'Compliance';
  } else if (request.activity === 'Applied') {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    request.dueDate = dueDate;
    request.status = 'In Process';
  } else if (request.activity === 'Not Applied') {
    request.status = 'Overdue';
  }

  const data = this.complianceTrackerRepository.create(request);
  const result = await this.complianceTrackerRepository.save(data);

  if (result) {

    await this.eventLogService.create({
      moduleName: 'Compliance Enter Details',
      eventName: 'Create',
      oldValue: '',
      newValue: JSON.stringify(result),
      eventPrimeryKey: result.id,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime: new Date(),
    });

    return {
      message: `${Messages.Resource.Created} : Compliance Tracker`,
      data: result,
    };
  }

  throw new Error('Failed to create compliance tracker');
}

  async findAll(search: string): Promise<ComplianceTrackerWithResponse> {
    const query = this.complianceTrackerRepository
      .createQueryBuilder('compliance_trackers')
      .leftJoinAndSelect('compliance_trackers.location', 'location')
      .leftJoinAndSelect(
        'compliance_trackers.complianceConfig',
        'complianceConfig',
      )
      .leftJoinAndSelect(
        'complianceConfig.complianceCategory',
        'complianceCategory',
      )
      .leftJoinAndSelect('compliance_trackers.user', 'user');

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where(
            'CAST(compliance_trackers.locationId AS CHAR) LIKE :locationKey',
            {
              locationKey: `%${search}%`,
            },
          )
            .orWhere(
              'CAST(compliance_trackers.complianceConfigId AS CHAR) LIKE :configKey',
              {
                configKey: `%${search}%`,
              },
            )
            .orWhere('CAST(compliance_trackers.userId AS CHAR) LIKE :userKey', {
              userKey: `%${search}%`,
            })
            .orWhere('LOWER(compliance_trackers.status) LIKE :statusKey', {
              statusKey: `%${search.toLowerCase()}%`,
            })
            .orWhere('LOWER(compliance_trackers.doc) LIKE :docKey', {
              docKey: `%${search.toLowerCase()}%`,
            })
            .orWhere(
              'LOWER(compliance_trackers.complianceCertificate) LIKE :certificateKey',
              {
                certificateKey: `%${search.toLowerCase()}%`,
              },
            );
        }),
      );
    }

    const result = await query.getMany();

    return {
      message: `${Messages.Resource.Found}: Compliance Tracker`,
      data: result,
    };
  }

  async findOne(id: number): Promise<ComplianceTrackerWithResponse> {
    const result = await this.complianceTrackerRepository.findOne({
      where: { id },
      relations: ['location', 'complianceConfig', 'user'],
    });

    if (!result) {
      throw new HttpException(
        `${Messages.Resource.NotFound}: Compliance Tracker`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `${Messages.Resource.Found} : Compliance Tracker`,
      data: result,
    };
  }

async update(
  complianceTrackerId: number,
  request: UpdateComplianceTrackerDto,
  user: any,
): Promise<ComplianceTrackerWithResponse> {

  const oldData = await this.complianceTrackerRepository.findOne({
    where: { id: complianceTrackerId },
  });

  if (!oldData) {
    throw new HttpException(
      `${Messages.Resource.NotFound} : Compliance Tracker`,
      HttpStatus.NOT_FOUND,
    );
  }

  if (request.activity === 'Compliant') {
    request.status = 'Compliance';
  } else if (request.activity === 'Applied') {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    request.dueDate = dueDate;
    request.status = 'In Process';
  } else if (request.activity === 'Not Applied') {
    request.status = 'Overdue';
  }
  console.log('request',request)
  await this.complianceTrackerRepository.update(
    { id: complianceTrackerId },
    request,
  );

  const updatedData = await this.complianceTrackerRepository.findOne({
    where: { id: complianceTrackerId },
  });

  await this.eventLogService.create({
    moduleName: 'Compliance Enter Details',
    eventName: 'Update',
    oldValue: JSON.stringify(oldData),
    newValue: JSON.stringify(updatedData),
    eventPrimeryKey: complianceTrackerId,
    eventUserId: user.userId,
    eventUserName: user.username,
    eventDateTime: new Date(),
  });

  return {
    message: `${Messages.Resource.Updated} : Compliance Tracker`,
  };
}

async remove(
  id: number,
  user: any,
): Promise<ComplianceTrackerWithResponse> {

  const oldData = await this.complianceTrackerRepository.findOne({
    where: { id },
  });

  if (!oldData) {
    throw new HttpException(
      `${Messages.Resource.NotFound} : Compliance Tracker`,
      HttpStatus.NOT_FOUND,
    );
  }

  const deleteData = await this.complianceTrackerRepository.delete(id);

  if (deleteData.affected && deleteData.affected > 0) {

    await this.eventLogService.create({
      moduleName: 'Compliance Enter Details',
      eventName: 'Delete',
      oldValue: JSON.stringify(oldData),
      newValue: '',
      eventPrimeryKey: id,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime: new Date(),
    });

    return {
      message: `${Messages.Resource.Deleted} : Compliance Tracker`,
    };
  }

  throw new HttpException(
    `${Messages.Resource.NotFound} : Compliance Tracker`,
    HttpStatus.NOT_FOUND,
  );
}

async getComplianceTrackerByComplianceCategoryId(
  complianceCategoryId: number,
): Promise<ComplianceTrackerWithResponse> {

  const result = await this.complianceTrackerRepository
    .createQueryBuilder('tracker')
    .leftJoinAndSelect('tracker.location', 'location')
    .leftJoinAndSelect('tracker.complianceConfig', 'complianceConfig')
    .leftJoinAndSelect('tracker.user', 'user')
    .where('tracker.complianceCategoryId = :complianceCategoryId', {
      complianceCategoryId,
    })
    .orderBy('tracker.createdAt', 'DESC')
    .getMany();

  return {
    message: result.length
      ? `${Messages.Resource.Found}: Compliance Tracker`
      : `${Messages.Resource.NotFound}: Compliance Tracker`,

    data: result,
  };
}
}
