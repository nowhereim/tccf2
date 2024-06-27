import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../libs/repository/base-entity';
import { LectureScheduleEntity } from './lectureSchedule.entity';

@Entity()
@Index(['userId', 'lectureSchedule'], { unique: true })
export class EnrollmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => LectureScheduleEntity,
    (lectureSchedule) => lectureSchedule.enrollments,
  )
  @JoinColumn({ name: 'lectureSchedule', referencedColumnName: 'id' })
  lectureSchedule!: LectureScheduleEntity;

  @Column()
  userId: number;

  constructor(args: { userId: number }) {
    super();
    if (args) {
      Object.assign(this, args);
    }
  }
}
