import { LectureRepository } from '../../domain/repository';
import { Lecture } from '../../domain/model';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from '../../../libs/repository/abstract-repository';
import { LectureEntity } from '../entities/lecture.entity';

@Injectable()
export class LectureRepositoryImpl
  extends Repository<LectureEntity>
  implements LectureRepository
{
  protected entityClass = LectureEntity;
  async findByLectureScheduleId(
    lectureScheduleId: number,
    transactionalEntityManager: EntityManager,
  ): Promise<Lecture> {
    /* 비관 락 적용 */
    const entity = await transactionalEntityManager
      .createQueryBuilder(this.entityClass, 'lecture')
      // .setLock('pessimistic_write')
      .leftJoinAndSelect('lecture.lectureSchedules', 'lectureSchedules')
      .leftJoinAndSelect('lectureSchedules.enrollments', 'enrollments')
      .where('lectureSchedules.id = :lectureScheduleId', {
        lectureScheduleId,
      })
      .getOne();

    return new Lecture({
      id: entity.id,
      name: entity.name,
      lectureSchedules: entity.lectureSchedules,
    });
  }

  async findById(id: number): Promise<Lecture> {
    return new Lecture(
      await this.getManager().findOne(this.entityClass, {
        where: {
          id,
        },
        relations: ['lectureSchedules', 'lectureSchedules.enrollments'],
      }),
    );
  }

  async save(
    args: Lecture,
    transactionalEntityManager?: EntityManager,
  ): Promise<Lecture> {
    const entity = new LectureEntity({
      id: args.id,
      name: args.name,
      lectureSchedules: args.lectureSchedules,
    });
    return transactionalEntityManager
      ? new Lecture(await transactionalEntityManager.save(entity))
      : new Lecture(await this.getManager().save(entity));
  }
}
