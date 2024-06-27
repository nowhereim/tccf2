import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  validate,
} from 'class-validator';
import { Lecture, LectureSchedule } from '../domain/model';

export class LectureRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  static toDomain(props: LectureRequestDto): Lecture {
    return new Lecture(props);
  }
}

export class LectureResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(args: Lecture) {
    Object.assign(this, args);
  }

  static async fromDomain(lecture: Lecture): Promise<LectureResponseDto> {
    const [error] = await validate(lecture);
    if (error) {
      throw error;
    }
    return new LectureResponseDto(lecture);
  }
}

export class LectureScheduleRequestDto {
  @IsNumber()
  @IsNotEmpty()
  lectureId: number;

  @IsDate()
  @IsNotEmpty()
  openDate: Date;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsNumber()
  @IsNotEmpty()
  currentEnrollment: number;

  static toDomain(props: LectureScheduleRequestDto) {
    return {
      lectureId: props.lectureId,
      openDate: props.openDate,
      capacity: props.capacity,
      currentEnrollment: props.currentEnrollment,
    };
  }
}

export class LectureScheduleRegisterResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  lecture: string;

  @IsNotEmpty()
  openDate: Date;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsNumber()
  @IsNotEmpty()
  currentEnrollment: number;

  constructor(args: LectureScheduleResponseProps) {
    Object.assign(this, args);
  }

  static async fromDomain(
    lecture: Lecture,
  ): Promise<LectureScheduleResponseDto[]> {
    const [error] = await validate(lecture);
    if (error) {
      throw error;
    }
    return lecture.lectureSchedules.map(
      (schedule) =>
        new LectureScheduleRegisterResponseDto({
          id: schedule.id,
          lecture: schedule.lecture.name,
          openDate: schedule.openDate,
          capacity: schedule.capacity,
          currentEnrollment: schedule.currentEnrollment,
        }),
    );
  }
}

export class LectureScheduleResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  lecture: string;

  @IsNotEmpty()
  openDate: Date;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsNumber()
  @IsNotEmpty()
  currentEnrollment: number;

  constructor(args: LectureScheduleResponseProps) {
    Object.assign(this, args);
  }

  static async fromDomain(
    lectureSchedule: LectureSchedule,
  ): Promise<LectureScheduleResponseDto> {
    const [error] = await validate(lectureSchedule);
    if (error) {
      throw error;
    }
    return new LectureScheduleResponseDto({
      id: lectureSchedule.id,
      lecture: lectureSchedule.lecture.name,
      openDate: lectureSchedule.openDate,
      capacity: lectureSchedule.capacity,
      currentEnrollment: lectureSchedule.currentEnrollment,
    });
  }
}

export class EnrollmentRequestDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  lectureScheduleId: number;

  static toDomain(props: EnrollmentRequestDto) {
    return {
      userId: props.userId,
      lectureScheduleId: props.lectureScheduleId,
    };
  }
}

export class EnrollmentResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  lectureSchedule: LectureSchedule;

  constructor(args) {
    Object.assign(this, args);
  }

  static async fromDomain(response): Promise<EnrollmentResponseDto> {
    const [error] = await validate(response);
    if (error) {
      throw error;
    }
    return new EnrollmentResponseDto(response);
  }
}

export class EnrollmentStatusRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lectureScheduleId: number;

  static toDomain(props: EnrollmentStatusRequestDto) {
    return {
      userId: props.userId,
      lectureScheduleId: props.lectureScheduleId,
    };
  }
}

export class EnrollmentStatusResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  lectureSchedule: LectureSchedule;

  constructor(args) {
    Object.assign(this, args);
  }

  static fromDomain(response): EnrollmentStatusResponseDto {
    return new EnrollmentStatusResponseDto(response);
  }
}

type LectureScheduleResponseProps = {
  id: number;
  lecture: string;
  openDate: Date;
  capacity: number;
  currentEnrollment: number;
};
