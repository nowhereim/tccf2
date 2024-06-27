import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LectureService } from 'src/lecture/application/service';
import { LectureModule } from 'src/lecture/lecture.module';
import { DatabaseModule } from 'src/libs/datasource/module';

describe('LectureApplicationIntegration', () => {
  let app: INestApplication;
  let lectureService: LectureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LectureModule, DatabaseModule],
    }).compile();

    app = module.createNestApplication();
    lectureService = module.get<LectureService>(LectureService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('특강 수강 신청 동시성 테스트', () => {
    it('특강 수강 신청 동시성 테스트', async () => {
      const mockId = 1;
      const requests = Array.from({ length: 3000 }, (_, i) =>
        lectureService.enrollLecture({
          userId: i,
          lectureScheduleId: mockId,
        }),
      );

      await expect(Promise.all(requests)).rejects.toThrow(BadRequestException);

      const lecture = await lectureService.findLectureById(1);
      expect(
        lecture.lectureSchedules.find((schedule) => schedule.id === mockId)
          .currentEnrollment,
      ).toBe(30);
    });
  });
});
