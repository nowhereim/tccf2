import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from 'src/lecture/application/service';
import { LectureController } from 'src/lecture/presentation/lecture.controller';

describe('lecture controller test', () => {
  let app: INestApplication;
  let lectureController: LectureController;
  let lectureService: LectureService;
  let spy: jest.SpyInstance;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureController,
        {
          provide: LectureService,
          useValue: {
            registerLecture: jest.fn().mockResolvedValue({
              id: 1,
              name: '섹시 특강',
            }),
            registerLectureSchedule: jest.fn().mockResolvedValue({
              id: 1,
              name: '섹시 특강',
              lectureSchedules: [
                {
                  id: 1,
                  openDate: new Date(),
                  capacity: 30,
                  currentEnrollment: undefined,
                  lecture: { name: '섹시 특강' },
                },
              ],
              openDate: new Date(),
              capacity: 30,
            }),
            findLectureSchedules: jest.fn().mockResolvedValue([
              {
                id: 1,
                openDate: new Date(),
                capacity: 30,
                lecture: { name: '섹시 특강' },
              },
            ]),
            enrollLecture: jest.fn().mockResolvedValue({
              id: 1,
              userId: 1,
              lectureScheduleId: 1,
            }),
            findEnrollmentByUserIdAndLectureSchedulId: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                userId: 1,
                lectureSchedule: {
                  id: 1,
                  openDate: new Date(),
                  capacity: 30,
                  lecture: { id: 1, name: '섹시 특강' },
                },
              }),
          },
        },
      ],
    }).compile();
    lectureController = module.get<LectureController>(LectureController);
    lectureService = module.get<LectureService>(LectureService);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('강의 등록', () => {
    beforeEach(() => {
      spy = jest.spyOn(lectureService, 'registerLecture');
    });
    it('강의 등록 성공', async () => {
      const lectureId = 1;
      const lectureName = '섹시 특강';
      const result = await lectureController.registerLecture({
        name: lectureName,
      });

      expect(result).toEqual({
        id: lectureId,
        name: lectureName,
      });
    });

    it('강의 등록 인자 전달 ', async () => {
      const lectureName = '섹시 특강';
      await lectureController.registerLecture({
        name: lectureName,
      });
      expect(spy).toHaveBeenCalledWith({
        name: lectureName,
      });
    });
  });

  describe('강의 스케줄 등록', () => {
    beforeEach(() => {
      spy = jest.spyOn(lectureService, 'registerLectureSchedule');
    });
    it('강의 스케줄 등록', async () => {
      const lectureId = 1;
      const openDate = new Date();
      const capacity = 30;
      const currentEnrollment = 0;

      const result = await lectureController.registerLectureSchedule({
        lectureId,
        openDate,
        capacity,
        currentEnrollment,
      });

      expect(result).toEqual([
        {
          capacity: capacity,
          currentEnrollment: undefined,
          id: 1,
          lecture: '섹시 특강',
          openDate: expect.any(Date),
        },
      ]);
    });

    it('강의 스케줄 등록 인자 전달', async () => {
      const lectureId = 1;
      const openDate = new Date();
      const capacity = 30;
      const currentEnrollment = 0;

      await lectureController.registerLectureSchedule({
        lectureId,
        openDate,
        capacity,
        currentEnrollment,
      });

      expect(spy).toHaveBeenCalledWith({
        lectureId,
        openDate,
        capacity,
        currentEnrollment,
      });
    });
  });
  describe('강의 스케줄 조회', () => {
    beforeEach(() => {
      spy = jest.spyOn(lectureService, 'findLectureSchedules');
    });
    it('강의 스케줄 조회', async () => {
      const result = await lectureController.findLectureSchedules();
      expect(result).toEqual([
        {
          capacity: 30,
          currentEnrollment: undefined,
          id: 1,
          lecture: '섹시 특강',
          openDate: expect.any(Date),
        },
      ]);
    });
  });
  describe('강의 수강 등록', () => {
    it('강의 수강 등록', async () => {
      const userId = 1;
      const lectureScheduleId = 1;
      const result = await lectureController.enrollLecture({
        userId,
        lectureScheduleId,
      });
      expect(result).toEqual({
        id: 1,
        userId: 1,
        lectureScheduleId: 1,
      });
    });

    it('강의 수강 등록 인자 전달', async () => {
      spy = jest.spyOn(lectureService, 'enrollLecture');
      const userId = 1;
      const lectureScheduleId = 1;
      await lectureController.enrollLecture({
        userId,
        lectureScheduleId,
      });
      expect(spy).toHaveBeenCalledWith({
        userId,
        lectureScheduleId,
      });
    });
  });
  describe('강의 수강 조회', () => {
    it('강의 수강 조회', async () => {
      const userId = 1;
      const lectureScheduleId = 1;
      const result =
        await lectureController.findEnrollmentByUserIdAndLectureSchedulId({
          userId,
          lectureScheduleId,
        });
      expect(result).toEqual({
        id: 1,
        userId: 1,
        lectureSchedule: {
          id: 1,
          openDate: expect.any(Date),
          capacity: 30,
          lecture: { id: 1, name: '섹시 특강' },
        },
      });
    });

    it('강의 수강 조회 인자 전달', async () => {
      spy = jest.spyOn(
        lectureService,
        'findEnrollmentByUserIdAndLectureSchedulId',
      );
      const userId = 1;
      const lectureScheduleId = 1;
      await lectureController.findEnrollmentByUserIdAndLectureSchedulId({
        userId,
        lectureScheduleId,
      });
      expect(spy).toHaveBeenCalledWith({
        userId,
        lectureScheduleId,
      });
    });
  });
});
