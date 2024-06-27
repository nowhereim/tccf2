import { EntityManager } from 'typeorm';
import { Enrollment, Lecture, LectureSchedule } from './model';

export interface LectureRepository {
  save(
    args: Lecture,
    transactionalEntityManager?: EntityManager,
  ): Promise<Lecture>;

  findById(id: number): Promise<Lecture | undefined>;

  findByLectureScheduleId(
    lectureScheduleId: number,
    transactionalEntityManager?: EntityManager,
  ): Promise<Lecture>;
}

export interface EnrollmentRepository {
  findEnrollmentByUserIdAndLectureSchedulId(args: {
    userId: number;
    lectureScheduleId: number;
  }): Promise<Enrollment>;
}
export interface LectureScheduleRepository {
  findLectureScheduleList(): Promise<LectureSchedule[]>;
  findLectureScheduleById(
    id: number,
    transactionalEntityManager?: EntityManager,
  ): Promise<LectureSchedule>;
}
