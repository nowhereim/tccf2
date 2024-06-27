import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  LectureRequestProps,
  LectureResponseProps,
  LectureScheduleResponseProps,
  LectureScheduleRqeustProps,
} from './props.type';

export class Lecture {
  public id: number | null;
  public name: string;
  public lectureSchedules: LectureSchedule[] | null;

  constructor(args?: LectureRequestProps | LectureResponseProps) {
    Object.assign(this, args);
    if (
      'lectureSchedules' in args &&
      typeof args.lectureSchedules === 'object'
    ) {
      this.lectureSchedules = args.lectureSchedules.map(
        (schedule) => new LectureSchedule(schedule),
      );
    }
  }

  /* 강의 일정 추가 */
  public addLectureSchedule(args: { openDate: Date; capacity: number }) {
    if (!this.lectureSchedules) {
      this.lectureSchedules = [];
    }
    this.lectureSchedules.push(new LectureSchedule({ lecture: this, ...args }));
    return new Lecture(this);
  }
  /* 강의 수강 신청 */
  public enroll(args: { userId: number; lectureScheduleId: number }) {
    if (!this.lectureSchedules)
      throw new NotFoundException('Lecture schedule not found');

    const lectureScheduleIndex = this.lectureSchedules.findIndex(
      (schedule) => schedule.id === args.lectureScheduleId,
    );
    const lectureSchedule = this.lectureSchedules[lectureScheduleIndex];
    if (!lectureSchedule)
      throw new NotFoundException('Lecture schedule not found');

    lectureSchedule[lectureScheduleIndex] = lectureSchedule.enroll(args.userId);
  }
}

export class LectureSchedule {
  public readonly id: number | null;
  public readonly lecture: Lecture;
  public readonly openDate: Date;
  public readonly capacity: number;
  public currentEnrollment: number;
  public enrollments: Enrollment[] | null;

  constructor(args: LectureScheduleRqeustProps | LectureScheduleResponseProps) {
    Object.assign(this, args);
    if (!this.currentEnrollment) {
      this.currentEnrollment = 0;
    }
  }

  /* 강의 수강 신청 */
  public enroll(userId: number) {
    if (this.currentEnrollment >= this.capacity) {
      throw new BadRequestException('Capacity is full');
    }
    if (this.openDate > new Date()) {
      throw new BadRequestException('Lecture is not open yet');
    }
    if (this.enrollments) {
      this.enrollments.forEach((enrollment) =>
        new Enrollment(enrollment).checkAlreadyEnrolled(userId),
      );
    }
    this.currentEnrollment++;
    this.enrollments.push(new Enrollment({ userId }));
    return new LectureSchedule(this);
  }
}

export class Enrollment {
  public readonly id: number | null;
  public readonly userId: number;

  constructor(args: Partial<Enrollment>) {
    Object.assign(this, args);
  }

  public checkAlreadyEnrolled(userId: number) {
    if (this.userId === userId) {
      throw new BadRequestException('Already enrolled');
    }
  }
}
