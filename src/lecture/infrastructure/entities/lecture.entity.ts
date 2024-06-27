import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../libs/repository/base-entity';
import { LectureScheduleEntity } from './lectureSchedule.entity';

@Entity()
export class LectureEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => LectureScheduleEntity,
    (lectureSchedule) => lectureSchedule.lecture,
  )
  lectureSchedules: LectureScheduleEntity[];

  constructor(args?: LectureProps) {
    super();
    if (args) {
      this.id = args.id;
      this.name = args.name;
      this.lectureSchedules = args.lectureSchedules
        ? args.lectureSchedules.map(
            (lectureSchedule) => new LectureScheduleEntity(lectureSchedule),
          )
        : [];
    }
  }
}

type LectureProps = {
  id?: number | null;
  name: string;
  lectureSchedules?: {
    openDate: Date;
    capacity: number;
    currentEnrollment: number;
    enrollments?: {
      userId: number;
    }[];
  }[];
};
