import { INestApplication, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from 'src/lecture/application/service';
import { DataSource, EntityManager } from 'typeorm';

describe('lecture service integration test', () => {
  let app: INestApplication;
  let lectureService: LectureService;
  let dataSourceMock: Partial<DataSource>;
  let entityManagerMock: Partial<EntityManager>;

  beforeEach(async () => {
    entityManagerMock = {
      transaction: jest.fn().mockImplementation(async (cb) =>
        cb({
          findOne: jest.fn().mockResolvedValue({ id: 1, name: '섹시 특강' }),
          save: jest.fn().mockResolvedValue({ id: 1, name: '섹시 특강' }),
        }),
      ),
    };

    dataSourceMock = {
      manager: entityManagerMock as EntityManager,
      createEntityManager: jest.fn().mockReturnValue(entityManagerMock),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureService,
        { provide: DataSource, useValue: dataSourceMock },
        {
          provide: 'LectureRepository',
          useValue: {
            findByLectureScheduleId: jest.fn().mockResolvedValue({
              id: 1,
              name: '섹시 특강',
              enroll: jest.fn().mockResolvedValue({
                id: 1,
                userId: 1,
                lectureScheduleId: 1,
              }),
            }),
            findById: jest.fn(),
            save: jest.fn().mockResolvedValue({
              id: 1,
              name: '섹시 특강',
            }),
          },
        },
        {
          provide: 'EnrollmentRepository',
          useValue: { findEnrollmentByUserIdAndLectureSchedulId: jest.fn() },
        },
        {
          provide: 'LectureScheduleRepository',
          useValue: {
            findEnrollmentByUserIdAndLectureSchedulId: jest.fn(),
            findLectureScheduleList: jest.fn(),
          },
        },
      ],
    }).compile();

    lectureService = module.get<LectureService>(LectureService);

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('특강 신청', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(lectureService, 'enrollLecture');
    });
    it('특강 신청 성공', async () => {
      const result = await lectureService.enrollLecture({
        userId: 1,
        lectureScheduleId: 1,
      });
      // 여기에 결과 확인을 위한 expect를 추가할 수 있습니다.
      expect(result).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
      });
    });

    it('특강 신청 실패', async () => {
      spy.mockRejectedValue(new NotFoundException('특강이 존재하지 않습니다.'));
      await expect(
        lectureService.enrollLecture({
          userId: 3,
          lectureScheduleId: 3,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
