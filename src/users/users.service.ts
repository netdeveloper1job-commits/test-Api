import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Brackets, Repository } from 'typeorm';
import { Messages } from 'src/common/constants/messages';
import { UserWithResponse } from './dto/response/usersWithResponce';
import { UserResponse } from './dto/response/users-response';
import { EventLogService } from 'src/event-log/event-log.service';

// import { MailService } from 'src/common/helper/mail/mail.service';

// import { RegistrationType } from 'src/common/Enums/registration-type.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,private readonly eventLogService: EventLogService,
  ) {}

async create(
  request: CreateUserDto,
  user: any,
): Promise<UserWithResponse> {

  const data = this.userRepository.create(request);
  const result = await this.userRepository.save(data);

  if (result) {

    await this.eventLogService.create({
      moduleName: 'User',
      eventName: 'Create',
      oldValue: '',
      newValue: JSON.stringify(result),
      eventPrimeryKey: result.id,
      eventUserId: user.userId,
      eventUserName: user.username,
      eventDateTime: new Date(),
    });

    return {
      message: `${Messages.Resource.Created} : User`,
      data: result,
    };
  }

  throw new Error('Failed to create user');
}

  async findAll(search: string): Promise<UserWithResponse> {
    const query = this.userRepository
      .createQueryBuilder('users')
      .where(
        '(users.designation IS NULL OR LOWER(users.designation) NOT IN (:...adminDesignations))',
        {
          adminDesignations: ['administrator', 'adminstrator'],
        },
      );

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(users.name) LIKE :nameKey', {
            nameKey: `%${search.toLowerCase()}%`,
          })
            .orWhere('LOWER(users.designation) LIKE :designationKey', {
              designationKey: `%${search.toLowerCase()}%`,
            })
            .orWhere('LOWER(users.emailId) LIKE :emailIdKey', {
              emailIdKey: `%${search.toLowerCase()}%`,
            });
        }),
      );
    }

    const users = await query.getMany();

    return {
      message: `${Messages.Resource.Found}: User`,
      data: users,
    };
  }

  async findOne(id: number): Promise<UserWithResponse> {
    const result = await this.userRepository.findOne({
      where: { id },
    });

    if (!result) {
      throw new HttpException(
        `${Messages.Resource.NotFound}: User`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `${Messages.Resource.Found} : User`,
      data: result,
    };
  }

async update(
  userId: number,
  request: UpdateUserDto,
  user: any,
): Promise<UserWithResponse> {

  const oldData = await this.userRepository.findOne({
    where: { id: userId },
  });

  if (!oldData) {
    throw new HttpException(
      `${Messages.Resource.NotFound} : User`,
      HttpStatus.NOT_FOUND,
    );
  }

  await this.userRepository.update(
    { id: userId },
    request,
  );

  const updatedData = await this.userRepository.findOne({
    where: { id: userId },
  });

  await this.eventLogService.create({
    moduleName: 'Input Details',
    eventName: 'Update',
    oldValue: JSON.stringify(oldData),
    newValue: JSON.stringify(updatedData),
    eventPrimeryKey: userId,
    eventUserId: user.userId,
    eventUserName: user.username,
    eventDateTime: new Date(),
  });

  return {
    message: `${Messages.Resource.Updated} : User`,
  };
}

async remove(
  id: number,
  user: any,
): Promise<UserWithResponse> {

  const oldData = await this.userRepository.findOne({
    where: { id },
  });

  if (!oldData) {
    throw new HttpException(
      `${Messages.Resource.NotFound} : User`,
      HttpStatus.NOT_FOUND,
    );
  }

  const deleteData = await this.userRepository.delete(id);

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
      message: `${Messages.Resource.Deleted} : User`,
    };
  }

  throw new HttpException(
    `${Messages.Resource.NotFound} : User`,
    HttpStatus.NOT_FOUND,
  );
}

  async findByEmailId(emailId: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({
      where: { emailId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
