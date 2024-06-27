import { EnrollmentRepository } from '../../domain/repository';
import { Injectable } from '@nestjs/common';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { Repository } from '../../../libs/repository/abstract-repository';
import { Enrollment } from '../../domain/model';
@Injectable()
export class EnrollmentRepositoryImpl
  extends Repository<EnrollmentEntity>
  implements EnrollmentRepository
{
  protected entityClass = EnrollmentEntity;

  async findEnrollmentByUserIdAndLectureSchedulId(args: {
    userId: number;
    lectureScheduleId: number;
  }): Promise<Enrollment> {
    const entity = await this.getManager()
      .createQueryBuilder(this.entityClass, 'enrollment')
      .leftJoinAndSelect('enrollment.lectureSchedule', 'lectureSchedule')
      .where('enrollment.userId = :userId', { userId: args.userId })
      .andWhere('lectureSchedule.id = :lectureScheduleId', {
        lectureScheduleId: args.lectureScheduleId,
      })
      .getOne();
    return new Enrollment({
      id: entity.id,
      userId: entity.userId,
    });
  }
}
