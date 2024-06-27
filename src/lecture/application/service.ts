import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  EnrollmentRepository,
  LectureRepository,
  LectureScheduleRepository,
} from '../domain/repository';
import { Enrollment, Lecture, LectureSchedule } from '../domain/model';
import { DataSource } from 'typeorm';
import {
  enrollLectureProps,
  findEnrollmentByUserIdProps,
  registerLectureScheduleProps,
} from '../domain/props.type';
@Injectable()
export class LectureService {
  constructor(
    @Inject('LectureRepository')
    private readonly lectureRepository: LectureRepository,
    @Inject('EnrollmentRepository')
    private readonly enrollmentRepository: EnrollmentRepository,
    @Inject('LectureScheduleRepository')
    private readonly lectureScheduleRepository: LectureScheduleRepository,

    private readonly dataSource: DataSource,
  ) {}

  /* 특강 생성 */
  async registerLecture(args: Lecture): Promise<Lecture> {
    return await this.lectureRepository.save(args);
  }

  /* 특강 스케쥴 생성 */
  async registerLectureSchedule(
    args: registerLectureScheduleProps,
  ): Promise<Lecture> {
    const lecture = await this.lectureRepository.findById(args.lectureId);
    if (!lecture) {
      throw new NotFoundException('특강이 존재하지 않습니다.');
    }
    lecture.addLectureSchedule({
      openDate: args.openDate,
      capacity: args.capacity,
    });

    return await this.lectureRepository.save(lecture);
  }

  /* 특강 수강 생성 */
  async enrollLecture(args: enrollLectureProps): Promise<Lecture> {
    try {
      return await this.dataSource
        .createEntityManager()
        .transaction(async (transactionalEntityManager) => {
          const lecture = await this.lectureRepository.findByLectureScheduleId(
            args.lectureScheduleId,
            transactionalEntityManager,
          );
          if (!lecture) {
            throw new NotFoundException('특강이 존재하지 않습니다.');
          }
          lecture.enroll({
            userId: args.userId,
            lectureScheduleId: args.lectureScheduleId,
          });
          return await this.lectureRepository.save(
            lecture,
            transactionalEntityManager,
          );
        });
    } catch (error) {
      throw error;
    }
  }

  /* 특강 조회 */
  async findLectureById(id: number): Promise<Lecture> {
    const lecture = await this.lectureRepository.findById(id);
    if (!lecture) {
      throw new NotFoundException('특강이 존재하지 않습니다.');
    }
    return lecture;
  }

  /* 특강 수강 성공 조회 */
  async findEnrollmentByUserIdAndLectureSchedulId(
    args: findEnrollmentByUserIdProps,
  ): Promise<Enrollment> {
    const result =
      await this.enrollmentRepository.findEnrollmentByUserIdAndLectureSchedulId(
        {
          userId: args.userId,
          lectureScheduleId: args.lectureScheduleId,
        },
      );
    if (!result) {
      throw new NotFoundException('특강 수강 내역이 존재하지 않습니다.');
    }
    return result;
  }

  /* 특강 스케쥴 조회 */
  async findLectureSchedules(): Promise<LectureSchedule[]> {
    const lectureSchedules =
      await this.lectureScheduleRepository.findLectureScheduleList();
    if (!lectureSchedules.length) {
      throw new NotFoundException('특강 스케쥴이 존재하지 않습니다.');
    }
    return lectureSchedules;
  }
}
