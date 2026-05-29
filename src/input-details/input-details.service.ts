import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/common/constants/messages';
import { Brackets, Repository } from 'typeorm';
import { CreateInputDetailDto } from './dto/request/create-input-detail.dto';
import { UpdateInputDetailDto } from './dto/request/update-input-detail.dto';
import { InputDetailWithResponse } from './dto/response/input-detail-with-response';
import { InputDetail } from './entities/input-detail.entity';
import { EventLogService } from 'src/event-log/event-log.service';

@Injectable()
export class InputDetailsService {
  constructor(
    @InjectRepository(InputDetail)
    private inputDetailsRepository: Repository<InputDetail>, private readonly eventLogService: EventLogService,
  ) {}

async create(
  request: CreateInputDetailDto,
  user: any,
): Promise<InputDetailWithResponse> {

  const data = this.inputDetailsRepository.create(request);
  const result = await this.inputDetailsRepository.save(data);

  if (result) {

    await this.eventLogService.create({
      moduleName: 'Input Detail',
      eventName: 'Create',
      oldValue: '',
      newValue: JSON.stringify(result),
      eventPrimeryKey: result.id,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime: new Date(),
    });

    return {
      message: `${Messages.Resource.Created} : Input Detail`,
      data: result,
    };
  }

  throw new Error('Failed to create input detail');
}

  async findAll(search: string): Promise<InputDetailWithResponse> {
    const query = this.inputDetailsRepository.createQueryBuilder('input_details');

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(input_details.attributeType) LIKE :attributeTypeKey', {
            attributeTypeKey: `%${search.toLowerCase()}%`,
          }).orWhere(
            'LOWER(input_details.attributeName) LIKE :attributeNameKey',
            {
              attributeNameKey: `%${search.toLowerCase()}%`,
            },
          );
        }),
      );
    }

    const result = await query.getMany();

    return {
      message: `${Messages.Resource.Found}: Input Detail`,
      data: result,
    };
  }

  async findOne(id: number): Promise<InputDetailWithResponse> {
    const result = await this.inputDetailsRepository.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(
        `${Messages.Resource.NotFound}: Input Detail`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `${Messages.Resource.Found} : Input Detail`,
      data: result,
    };
  }

  async update(
    inputDetailId: number,
    request: UpdateInputDetailDto,
     user: any,
  ): Promise<InputDetailWithResponse> {
    const oldData = await this.inputDetailsRepository.findOne({
      where: { id: inputDetailId },
    });

    if (!oldData) {
      throw new HttpException(
        `${Messages.Resource.NotFound} : Input Detail`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.inputDetailsRepository.update(
      { id: inputDetailId },
      request,
    );

    const updatedData = await this.inputDetailsRepository.findOne({
      where: { id: inputDetailId },
    });

    await this.eventLogService.create({
      moduleName: 'Input Detail',
      eventName: 'Update',
      oldValue: JSON.stringify(oldData),
      newValue: JSON.stringify(updatedData),
      eventPrimeryKey: inputDetailId,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime:new Date()
    });

    return {
      message: `${Messages.Resource.Updated} : Input Detail`,
    };
  }

async remove(
  id: number,
  user: any,
): Promise<InputDetailWithResponse> {

  const oldData = await this.inputDetailsRepository.findOne({
    where: { id },
  });

  if (!oldData) {
    throw new HttpException(
      `${Messages.Resource.NotFound} : Input Detail`,
      HttpStatus.NOT_FOUND,
    );
  }

  try {

    const deleteData = await this.inputDetailsRepository.delete(id);

    if (deleteData.affected && deleteData.affected > 0) {

      await this.eventLogService.create({
        moduleName: 'Input Detail',
        eventName: 'Delete',
        oldValue: JSON.stringify(oldData),
        newValue: '',
        eventPrimeryKey: id,
        eventUserId: user.userId,
        eventUserName: user.username,

        eventDateTime: new Date(),
      });

      return {
        message: `${Messages.Resource.Deleted} : Input Detail`,
      };
    }

  } catch (error: any) {
    throw error;
  }

  throw new HttpException(
    `${Messages.Resource.NotFound} : Input Detail`,
    HttpStatus.NOT_FOUND,
  );
}
}
