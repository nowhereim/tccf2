import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  EnrollmentRequestDto,
  EnrollmentResponseDto,
  EnrollmentStatusRequestDto,
  LectureRequestDto,
  LectureResponseDto,
  LectureScheduleRegisterResponseDto,
  LectureScheduleRequestDto,
  LectureScheduleResponseDto,
} from './dto';
import { LectureService } from '../application/service';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  /* 특강 생성 */
  @Post()
  async registerLecture(@Body() args: LectureRequestDto) {
    return await LectureResponseDto.fromDomain(
      await this.lectureService.registerLecture(
        LectureRequestDto.toDomain(args),
      ),
    );
  }

  /* 특강 스케쥴 생성 */
  @Post('/schedule')
  async registerLectureSchedule(@Body() args: LectureScheduleRequestDto) {
    return await LectureScheduleRegisterResponseDto.fromDomain(
      await this.lectureService.registerLectureSchedule(
        LectureScheduleRequestDto.toDomain(args),
      ),
    );
  }

  /* 특강 수강 생성 */
  @Post('/apply')
  async enrollLecture(@Body() args: EnrollmentRequestDto) {
    return await EnrollmentResponseDto.fromDomain(
      await this.lectureService.enrollLecture(
        EnrollmentRequestDto.toDomain(args),
      ),
    );
  }

  /* 특강 수강 성공 여부 조회 */
  @Get('/application')
  async findEnrollmentByUserIdAndLectureSchedulId(
    @Query() args: EnrollmentStatusRequestDto,
  ) {
    return await EnrollmentResponseDto.fromDomain(
      await this.lectureService.findEnrollmentByUserIdAndLectureSchedulId(
        EnrollmentStatusRequestDto.toDomain(args),
      ),
    );
  }

  /* 특강 스케쥴 조회 */
  @Get('/schedule')
  async findLectureSchedules(): Promise<LectureScheduleResponseDto[]> {
    const result = await this.lectureService.findLectureSchedules();
    return Promise.all(
      result.map(
        async (entity) => await LectureScheduleResponseDto.fromDomain(entity),
      ),
    );
  }
}
