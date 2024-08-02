import { Lecture, LectureSchedule } from './model';

export type LectureScheduleRqeustProps = {
  lecture: Lecture;
  openDate: Date;
  capacity: number;
};

export type LectureScheduleResponseProps = {
  id: number;
  openDate: Date;
  capacity: number;
  currentEnrollment: number;
  lecture?: {
    name: string;
    id: number;
  };
  enrollments: {
    id: number;
    userId: number;
  }[];
};

export type EnrollmentRequestProps = {
  userId: number;
  lectureSchedule: LectureSchedule;
};

export type EnrollmentResponseProps = {
  id: number;
  userId: number;
  lectureSchedule: {
    id: number;
    lecture: Lecture;
    openDate: Date;
    capacity: number;
    currentEnrollment: number;
  };
};

export type LectureRequestProps = {
  name: string;
};

export type LectureResponseProps = {
  id: number;
  name: string;
  description: string;
  lectureSchedules: {
    id: number;
    openDate: Date;
    capacity: number;
    currentEnrollment: number;
    enrollments: {
      id: number;
      userId: number;
    }[];
  }[];
};

export type registerLectureProps = Lecture;

export type registerLectureScheduleProps = {
  lectureId: number;
  openDate: Date;
  capacity: number;
};

export type enrollLectureProps = {
  userId: number;
  lectureScheduleId: number;
};

export type findEnrollmentByUserIdProps = {
  userId: number;
  lectureScheduleId: number;
};
