import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/common/constants/messages';
import { Brackets, Repository } from 'typeorm';
import { CreateLocationDto } from './dto/request/create-location.dto';
import { UpdateLocationDto } from './dto/request/update-location.dto';
import { LocationWithResponse } from './dto/response/location-with-response';
import { Location } from './entities/location.entity';
import { EventLogService } from 'src/event-log/event-log.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    private readonly eventLogService: EventLogService,

  ) {}

async create(
  request: CreateLocationDto,
  user: any,
): Promise<LocationWithResponse> {

  const data = this.locationRepository.create(request);
  const result = await this.locationRepository.save(data);

  if (result) {

    await this.eventLogService.create({
      moduleName: 'Location',
      eventName: 'Create',
      oldValue: '',
      newValue: JSON.stringify(result),
      eventPrimeryKey: result.id,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime: new Date(),
    });

    return {
      message: `${Messages.Resource.Created} : Location`,
      data: result,
    };
  }

  throw new Error('Failed to create location');
}


getDaysDiffFromToday = (dueDate: string | Date) => {
  if (!dueDate) return null;

  const today = new Date();
  const due = new Date(dueDate);

  return Math.floor(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
};

async findAll(search: string): Promise<LocationWithResponse> {

  const query = this.locationRepository
    .createQueryBuilder('location')
    .leftJoinAndSelect('location.industryType', 'industryType')
    .leftJoinAndSelect('industryType.complianceCategories', 'complianceCategory')
    .leftJoinAndSelect('complianceCategory.complianceTrackers', 'complianceTracker');

  // 🔍 SEARCH FIXED
  if (search) {
    query.andWhere(
      new Brackets((qb) => {
        qb.where('LOWER(location.location) LIKE :search', {
          search: `%${search.toLowerCase()}%`,
        })
          .orWhere('LOWER(location.address) LIKE :search', {
            search: `%${search.toLowerCase()}%`,
          })
          .orWhere('LOWER(industryType.name) LIKE :search', {
            search: `%${search.toLowerCase()}%`,
          });
      }),
    );
  }

  const result = await query.getMany();

  if (!result?.length) {
    return {
      message: `${Messages.Resource.NotFound}: Location`,
      data: [],
    };
  }

  // TRANSFORM + GRAND TOTALS
  const transformed = result.map((location) => {
    let totalCategories = 0;
    let totalTrackers = 0;
    let totalComplaints = 0;
    let totalOverdue = 0;
    let totalAlert = 0;

    const industryType = location.industryType;

    const complianceCategories = (industryType?.complianceCategories || []).map((category) => {
      totalCategories++;

      const trackers = category.complianceTrackers || [];

      let categoryTrackers = 0;

      for (const tracker of trackers) {
        totalTrackers++;
        categoryTrackers++;

        const status = (tracker.status || '').toLowerCase();

        //  Compliant
        if (status === 'compliant') {
          totalComplaints++;
        }

        // date logic
        const daysDiff = this.getDaysDiffFromToday(tracker.dueDate);

        if (daysDiff !== null) {
          if (daysDiff < 0) {
            totalOverdue++;
          } else if (daysDiff <= 30) {
            totalAlert++;
          }
        }
      }

      return {
        ...category,
        totalTrackers: categoryTrackers,
      };
    });

    return {
      ...location,

      industryType: {
        ...industryType,
        complianceCategories,
      },

      grandTotals: {
        totalCategories,
        totalTrackers,
        totalComplaints,
        totalOverdue,
        totalAlert,
      },
    };
  });

  return {
    message: `${Messages.Resource.Found}: Location`,
    data: transformed,
  };
}

  async findOne(id: number): Promise<LocationWithResponse> {
    const result = await this.locationRepository.findOne({
      where: { id },
    });

    if (!result) {
      throw new HttpException(
        `${Messages.Resource.NotFound}: Location`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `${Messages.Resource.Found} : Location`,
      data: result,
    };
  }

async update(
  locationId: number,
  request: UpdateLocationDto,
  user: any,
): Promise<LocationWithResponse> {

  const oldData = await this.locationRepository.findOne({
    where: { id: locationId },
  });

  if (!oldData) {
    throw new HttpException(
      `${Messages.Resource.NotFound} : Location`,
      HttpStatus.NOT_FOUND,
    );
  }

  await this.locationRepository.update(
    { id: locationId },
    request,
  );

  const updatedData = await this.locationRepository.findOne({
    where: { id: locationId },
  });

  await this.eventLogService.create({
    moduleName: 'Input Details',
    eventName: 'Update',
    oldValue: JSON.stringify(oldData),
    newValue: JSON.stringify(updatedData),
    eventPrimeryKey: locationId,
    eventUserId: user.userId,
    eventUserName: user.username,
    eventDateTime: new Date(),
  });

  return {
    message: `${Messages.Resource.Updated} : Location`,
  };
}

async remove(
  id: number,
  user: any,
): Promise<LocationWithResponse> {

  const oldData = await this.locationRepository.findOne({
    where: { id },
  });

  if (!oldData) {
    throw new HttpException(
      `${Messages.Resource.NotFound} : Location`,
      HttpStatus.NOT_FOUND,
    );
  }

  const deleteData = await this.locationRepository.delete(id);

  if (deleteData.affected && deleteData.affected > 0) {

    await this.eventLogService.create({
      moduleName: 'Input Details',
      eventName: 'Delete',
      oldValue: JSON.stringify(oldData),
      newValue: '',
      eventPrimeryKey: id,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime: new Date(),
    });

    return {
      message: `${Messages.Resource.Deleted} : Location`,
    };
  }

  throw new HttpException(
    `${Messages.Resource.NotFound} : Location`,
    HttpStatus.NOT_FOUND,
  );
}
}
