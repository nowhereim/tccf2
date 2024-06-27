import { Lecture, LectureSchedule } from 'src/lecture/domain/model';

describe('LectureDomainModel', () => {
  let lecture: Lecture;

  beforeEach(() => {
    lecture = new Lecture({
      id: 1,
      name: 'Test Lecture',
      lectureSchedules: [
        new LectureSchedule({
          id: 1,
          openDate: new Date(),
          capacity: 30,
          currentEnrollment: 0,
          enrollments: [],
        }),
      ],
    });
  });

  describe('Lecture', () => {
    it('should be defined', () => {
      expect(lecture).toBeDefined();
    });

    it('should add a lecture schedule', () => {
      const scheduleArgs = { openDate: new Date(), capacity: 30 };
      lecture.addLectureSchedule(scheduleArgs);
      expect(lecture.lectureSchedules.length).toBe(2);
      expect(lecture.lectureSchedules[0].capacity).toBe(30);
    });
  });

  describe('LectureSchedule', () => {
    it('should enroll a user', () => {
      lecture.enroll({ userId: 1, lectureScheduleId: 1 });
      expect(lecture.lectureSchedules[0].enrollments).toEqual(
        expect.arrayContaining([expect.objectContaining({ userId: 1 })]),
      );
    });
  });
});
