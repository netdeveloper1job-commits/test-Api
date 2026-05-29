import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/common/constants/messages';
import { Brackets, Repository } from 'typeorm';
import { CreateComplianceCategoryDto } from './dto/request/create-compliance-category.dto';
import { UpdateComplianceCategoryDto } from './dto/request/update-compliance-category.dto';
import { ComplianceCategoryWithResponse } from './dto/response/compliance-category-with-response';
import { ComplianceCategory } from './entities/compliance-category.entity';
import { EventLogService } from 'src/event-log/event-log.service';

@Injectable()
export class ComplianceCategoryService {
  constructor(
    @InjectRepository(ComplianceCategory)
    private complianceCategoryRepository: Repository<ComplianceCategory>,
    private readonly eventLogService: EventLogService,
  ) {}

async create(
  request: CreateComplianceCategoryDto,
  user: any,
): Promise<ComplianceCategoryWithResponse> {

  const data = this.complianceCategoryRepository.create(request);
  const result = await this.complianceCategoryRepository.save(data);

  if (result) {

    await this.eventLogService.create({
      moduleName: 'Compliance Category',
      eventName: 'Create',
      oldValue: '',
      newValue: JSON.stringify(result),
      eventPrimeryKey: result.id,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime: new Date(),
    });

    return {
      message: `${Messages.Resource.Created} : Compliance Category`,
      data: result,
    };
  }

  throw new Error('Failed to create compliance category');
}

async findAll(search: string): Promise<ComplianceCategoryWithResponse> {
  const query = this.complianceCategoryRepository
    .createQueryBuilder('compliance_categories')
    .leftJoinAndSelect(
      'compliance_categories.complianceTrackers',
      'tracker',
    )
    .leftJoinAndSelect('tracker.location', 'location')
    .leftJoinAndSelect('tracker.user', 'user');

  // 🔍 SEARCH FILTER
  if (search) {
    query.andWhere(
      new Brackets((qb) => {
        qb.where(
          'LOWER(compliance_categories.complianceCategoryName) LIKE :nameKey',
          {
            nameKey: `%${search.toLowerCase()}%`,
          },
        ).orWhere(
          'CAST(compliance_categories.industryTypeId AS CHAR) LIKE :industryTypeIdKey',
          {
            industryTypeIdKey: `%${search}%`,
          },
        );
      }),
    );
  }

  const result = await query.getMany();

  // TRANSFORM + CALCULATE COUNTS
  const transformed = result.map((category) => {
    let totalComplianceTrackers = 0;
    let totalComplaints = 0;
    let totalOverdue = 0;
    let totalAlert = 0;

    const trackers = category.complianceTrackers || [];

    const enrichedTrackers = trackers.map((tracker) => {
      totalComplianceTrackers++;

      const activity = (tracker.activity || '').toLowerCase();

      const isCompliant = activity === 'compliant';
      const isApplied = activity === 'applied';
      const isNotApplied = activity === 'not applied';

      let alert = 0;
      let overdue = 0;

      if (!isCompliant) {
        const daysDiff = this.getDaysDiffFromToday(tracker.dueDate);

        if (daysDiff !== null) {
          if (daysDiff < 0) {
            overdue = 1;
            totalOverdue++;
          } else if (daysDiff <= 30) {
            alert = 1;
            totalAlert++;
          }
        }
      }

      if (!isCompliant) {
        totalComplaints++;
      }

      const trackerStatus = {
        applied: isApplied ? 1 : 0,
        notApplied: isNotApplied ? 1 : 0,
        compliant: isCompliant ? 1 : 0,
        alert,
        overdue,
      };

      return {
        ...tracker,
        trackerStatus,
      };
    });

    return {
      ...category,
      complianceTrackers: enrichedTrackers,

      // COUNTS
      totalComplianceTrackers,
      totalComplaints,
      totalOverdue,
      totalAlert,
    };
  });

  return {
    message: `${Messages.Resource.Found}: Compliance Category`,
    data: transformed,
  };
}

  async findOne(id: number): Promise<ComplianceCategoryWithResponse> {
    const result = await this.complianceCategoryRepository.findOne({ where: { id }, 
    relations:['industryType']});

    if (!result) {
      throw new HttpException(
        `${Messages.Resource.NotFound}: Compliance Category`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `${Messages.Resource.Found} : Compliance Category`,
      data: result,
    };
  }

  async update(
    complianceCategoryId: number,
    request: UpdateComplianceCategoryDto,
    user: any,
  ): Promise<ComplianceCategoryWithResponse> {
    const oldData = await this.complianceCategoryRepository.findOne({
      where: { id: complianceCategoryId },
    });

    if (!oldData) {
      throw new HttpException(
        `${Messages.Resource.NotFound} : Compliance Category`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.complianceCategoryRepository
      .createQueryBuilder()
      .update(ComplianceCategory)
      .set(request)
      .where({ id: complianceCategoryId })
      .execute();

    const updatedData = await this.complianceCategoryRepository.findOne({
      where: { id: complianceCategoryId },
    });

    await this.eventLogService.create({
      moduleName: 'Compliance Category',
      eventName: 'Update',
      oldValue: JSON.stringify(oldData),
      newValue: JSON.stringify(updatedData),
      eventPrimeryKey: complianceCategoryId,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime: new Date()
    });

    return {
      message: `${Messages.Resource.Updated} : Compliance Category`,
    };
  }

  async remove(id: number, user: any): Promise<ComplianceCategoryWithResponse> {
    const oldData = await this.complianceCategoryRepository.findOne({
      where: { id },
    });

    if (!oldData) {
      throw new HttpException(
        `${Messages.Resource.NotFound} : Compliance Category`,
        HttpStatus.NOT_FOUND,
      );
    }

    const deleteData = await this.complianceCategoryRepository.delete(id);

    if (deleteData.affected && deleteData.affected > 0) {
      await this.eventLogService.create({
        moduleName: 'Compliance Category',
        eventName: 'Delete',
        oldValue: JSON.stringify(oldData),
        newValue: '',
        eventPrimeryKey: id,
        eventUserId: user.userId,
        eventUserName: user.username,
        eventDateTime: new Date(),
      });

      return {
        message: `${Messages.Resource.Deleted} : Compliance Category`,
      };
    }

    throw new HttpException(
      `${Messages.Resource.NotFound} : Compliance Category`,
      HttpStatus.NOT_FOUND,
    );
  }

getDaysDiffFromToday = (dueDate: string | Date) => {
  if (!dueDate) return null;

  const today = new Date();
  const due = new Date(dueDate);

  return Math.floor(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
};

async getComplianceCategoryByIndustryId(industryId: number) {
  const result = await this.complianceCategoryRepository.find({
    where: { industryTypeId: industryId },
    relations: [
      'industryType',
      'complianceTrackers',
      'complianceTrackers.location',
      'complianceTrackers.user',
      // 'complianceTrackers.complianceCategory',
    ],
  });

  if (!result?.length) {
    throw new HttpException(
      `${Messages.Resource.NotFound}: Compliance Category`,
      HttpStatus.NOT_FOUND,
    );
  }

  const transformed = result.map((category) => {
    let totalTrackers = 0;
    let totalComplaints = 0;
    let totalOverdue = 0;
    let totalAlert = 0;

    const trackers = category.complianceTrackers || [];

    const enrichedTrackers = trackers.map((tracker) => {
      totalTrackers++;

      const activity = (tracker.activity || '').toLowerCase();

      const isCompliant = activity === 'compliant';
      const isApplied = activity === 'applied';
      const isNotApplied = activity === 'not applied';

      let alert = 0;
      let overdue = 0;

      if (!isCompliant) {
        const daysDiff = this.getDaysDiffFromToday(tracker.dueDate);

        if (daysDiff !== null) {
          if (daysDiff < 0) {
            overdue = 1;
            totalOverdue++;
          } else if (daysDiff <= 30) {
            alert = 1;
            totalAlert++;
          }
        }
      }

      const trackerStatus = {
        applied: isApplied ? 1 : 0,
        notApplied: isNotApplied ? 1 : 0,
        compliant: isCompliant ? 1 : 0,
        alert,
        overdue,
      };

      if (isCompliant) totalComplaints++;

      return {
        ...tracker,
        trackerStatus,
      };
    });

    return {
      ...category,
      complianceTrackers: enrichedTrackers,

      totalComplianceTrackers: totalTrackers,
      totalComplaints,
      totalOverdue,
      totalAlert,
    };
  });

  return {
    message: `${Messages.Resource.Found}: Compliance Category`,
    data: transformed,
  };
 }
}

