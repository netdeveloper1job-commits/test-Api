import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/common/constants/messages';
import { Brackets, Repository } from 'typeorm';
import { CreateComplianceConfigDto } from './dto/request/create-compliance-config.dto';
import { UpdateComplianceConfigDto } from './dto/request/update-compliance-config.dto';
import { ComplianceConfigWithResponse } from './dto/response/compliance-config-with-response';
import { ComplianceConfig } from './entities/compliance-config.entity';
import { EventLogService } from 'src/event-log/event-log.service';

@Injectable()
export class ComplianceConfigService {
  constructor(
    @InjectRepository(ComplianceConfig)
    private complianceConfigRepository: Repository<ComplianceConfig>,
    private readonly eventLogService: EventLogService,
  ) {}

async create(
  request: CreateComplianceConfigDto,
  user: any,
): Promise<ComplianceConfigWithResponse> {

  const data = this.complianceConfigRepository.create(request);
  const result = await this.complianceConfigRepository.save(data);

  if (result) {

    const userId = user?.id || user?.userId;

    if (!userId) {
      throw new Error('Invalid user for audit log');
    }

    await this.eventLogService.create({
      moduleName: 'Compliance Config',
      eventName: 'Create',
      oldValue: '',
      newValue: JSON.stringify(result),
      eventPrimeryKey: result.id,
      eventUserId: userId,
      eventUserName: user.username,
      eventDateTime: new Date(),
    });

    return {
      message: `${Messages.Resource.Created} : Compliance Config`,
      data: result,
    };
  }

  throw new Error('Failed to create compliance config');
}

  async findAll(search: string): Promise<ComplianceConfigWithResponse> {
    const query = this.complianceConfigRepository
      .createQueryBuilder('compliance_configs')
      .leftJoinAndSelect('compliance_configs.industryType', 'industryType')
      .leftJoinAndSelect(
        'compliance_configs.complianceCategory',
        'complianceCategory',
      );

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where(
            'CAST(compliance_configs.industryTypeId AS CHAR) LIKE :industryTypeKey',
            {
              industryTypeKey: `%${search}%`,
            },
          )
            .orWhere(
              'CAST(compliance_configs.complianceCategoryId AS CHAR) LIKE :categoryIdKey',
              {
                categoryIdKey: `%${search}%`,
              },
            )
            .orWhere(
              'LOWER(compliance_configs.complianceItem) LIKE :complianceItemKey',
              {
                complianceItemKey: `%${search.toLowerCase()}%`,
              },
            )
            .orWhere(
              'LOWER(compliance_configs.riskCategory) LIKE :riskCategoryKey',
              {
                riskCategoryKey: `%${search.toLowerCase()}%`,
              },
            );
        }),
      );
    }

    const result = await query.getMany();

    return {
      message: `${Messages.Resource.Found}: Compliance Config`,
      data: result,
    };
  }

  async findOne(id: number): Promise<ComplianceConfigWithResponse> {
    const result = await this.complianceConfigRepository.findOne({
      where: { id },
      relations: ['industryType', 'complianceCategory'],
    });

    if (!result) {
      throw new HttpException(
        `${Messages.Resource.NotFound}: Compliance Config`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `${Messages.Resource.Found} : Compliance Config`,
      data: result,
    };
  }

  async update(
    complianceConfigId: number,
    request: UpdateComplianceConfigDto,
    user: any,
  ): Promise<ComplianceConfigWithResponse> {
    const oldData = await this.complianceConfigRepository.findOne({
      where: { id: complianceConfigId },
    });

    if (!oldData) {
      throw new HttpException(
        `${Messages.Resource.NotFound} : Compliance Config`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.complianceConfigRepository
      .createQueryBuilder()
      .update(ComplianceConfig)
      .set(request)
      .where({ id: complianceConfigId })
      .execute();

    const updatedData = await this.complianceConfigRepository.findOne({
      where: { id: complianceConfigId },
    });

    await this.eventLogService.create({
      moduleName: 'Compliance Config',
      eventName: 'Update',
      oldValue: JSON.stringify(oldData),
      newValue: JSON.stringify(updatedData),
      eventPrimeryKey: complianceConfigId,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime: new Date()
    });

    return {
      message: `${Messages.Resource.Updated} : Compliance Config`,
    };
  }

  async remove(id: number, user: any): Promise<ComplianceConfigWithResponse> {
    const oldData = await this.complianceConfigRepository.findOne({
      where: { id },
    });

    if (!oldData) {
      throw new HttpException(
        `${Messages.Resource.NotFound} : Compliance Config`,
        HttpStatus.NOT_FOUND,
      );
    }

    const deleteData = await this.complianceConfigRepository.delete(id);

    if (deleteData.affected && deleteData.affected > 0) {
      await this.eventLogService.create({
        moduleName: 'Compliance Config',
        eventName: 'Delete',
        oldValue: JSON.stringify(oldData),
        newValue: '',
        eventPrimeryKey: id,
        eventUserId: user.userId,
        eventUserName: user.username,
        eventDateTime: new Date(),
      });

      return {
        message: `${Messages.Resource.Deleted} : Compliance Config`,
      };
    }

    throw new HttpException(
      `${Messages.Resource.NotFound} : Compliance Config`,
      HttpStatus.NOT_FOUND,
    );
  }

  async getComplianceConfigByComplianceCategoryId(
    complianceCategoryId: number,
  ): Promise<ComplianceConfigWithResponse> {
    const result = await this.complianceConfigRepository.find({
      where: { complianceCategoryId },
      relations: ['industryType', 'complianceCategory'],
    });

    if (!result || result.length === 0) {
      throw new HttpException(
        `${Messages.Resource.NotFound}: Compliance Config`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `${Messages.Resource.Found}: Compliance Config`,
      data: result,
    };
  }
}
