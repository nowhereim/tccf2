import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../libs/repository/base-entity';
import { LectureEntity } from './lecture.entity';
import { EnrollmentEntity } from './enrollment.entity';

@Entity()
export class LectureScheduleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => LectureEntity, (lecture) => lecture.lectureSchedules)
  @JoinColumn({ name: 'lecture', referencedColumnName: 'id' })
  lecture!: LectureEntity;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.lectureSchedule)
  enrollments: EnrollmentEntity[];

  @Column()
  openDate: Date;

  @Column()
  capacity: number;

  @Column({ default: 0 })
  currentEnrollment: number;

  constructor(args: {
    id?: number;
    openDate: Date;
    capacity: number;
    currentEnrollment: number;
    enrollments?: {
      userId: number;
    }[];
  }) {
    super();
    if (args) {
      Object.assign(this, args);

      this.enrollments = args.enrollments
        ? args.enrollments.map((enrollment) => new EnrollmentEntity(enrollment))
        : [];
    }
  }
}
