import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
describe('lecture e2e test', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /lecture/apply', () => {
    /* 동시성 테스트 3000개 */
    it('특강 신청 성공', async () => {
      const requests = Array.from({ length: 3000 }, (_, i) =>
        request(app.getHttpServer())
          .post('/lecture/apply')
          .send({
            userId: i,
            lectureScheduleId: 1,
          })
          .expect(201),
      );

      await Promise.all(requests);
    });
  });
  describe('GET /lecture/application', () => {
    it('특강 신청 내역 조회 성공', async () => {
      await request(app.getHttpServer())
        .get('/lecture/application')
        .query({
          userId: 1,
          lectureScheduleId: 1,
        })
        .expect(200);
    });
  });
});
