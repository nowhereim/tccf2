import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1719171011629 implements MigrationInterface {
  name = 'Migrations1719171011629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` CHANGE \`lecture\` \`lectureId\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` CHANGE \`lectureId\` \`lecture\` int NULL`,
    );
  }
}
