import { Module } from '@nestjs/common';
import { LectureController } from './presentation/lecture.controller';
import { LectureRepositoryImpl } from './infrastructure/repositories/lecture-repository';
import { EnrollmentRepositoryImpl } from './infrastructure/repositories/enrollment-repository';
import { LectureScheduleRepositoryImpl } from './infrastructure/repositories/lecture-schedule-repository';
import { LectureService } from './application/service';

@Module({
  // imports: [KafkaModule],
  controllers: [LectureController],
  providers: [
    LectureService,
    {
      provide: 'LectureRepository',
      useClass: LectureRepositoryImpl,
    },
    {
      provide: 'EnrollmentRepository',
      useClass: EnrollmentRepositoryImpl,
    },
    {
      provide: 'LectureScheduleRepository',
      useClass: LectureScheduleRepositoryImpl,
    },
  ],
})
export class LectureModule {}
