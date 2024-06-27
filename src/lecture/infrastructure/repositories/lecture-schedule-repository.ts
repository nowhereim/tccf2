import { LectureScheduleRepository } from '../../domain/repository';
import { LectureSchedule } from '../../domain/model';
import { Injectable } from '@nestjs/common';
import { Repository } from '../../../libs/repository/abstract-repository';
import { LectureScheduleEntity } from '../entities/lectureSchedule.entity';

@Injectable()
export class LectureScheduleRepositoryImpl
  extends Repository<LectureScheduleEntity>
  implements LectureScheduleRepository
{
  protected entityClass = LectureScheduleEntity;
  async findLectureScheduleList(): Promise<LectureSchedule[]> {
    try {
      const result = await this.getManager()
        .createQueryBuilder(this.entityClass, 'lectureSchedule')
        .leftJoinAndSelect('lectureSchedule.lecture', 'lecture')
        .getMany();
      return result.map((entity) => new LectureSchedule(entity));
    } catch (e) {
      throw e;
    }
  }

  async findLectureScheduleById(
    id: number,
    transactionalEntityManager?,
  ): Promise<LectureSchedule> {
    try {
      const entity = await (
        transactionalEntityManager
          ? transactionalEntityManager
          : this.getManager()
      )
        .createQueryBuilder(this.entityClass, 'lectureSchedule')
        .setLock('optimistic', 0)
        .leftJoinAndSelect('lectureSchedule.lecture', 'lecture')
        .leftJoinAndSelect('lectureSchedule.enrollments', 'enrollments')
        .where('lectureSchedule.id = :id', { id })
        .getOne();
      return new LectureSchedule(entity);
    } catch (e) {
      throw e;
    }
  }
}
