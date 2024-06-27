import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1719342845681 implements MigrationInterface {
  name = 'Migrations1719342845681';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` DROP COLUMN \`version\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` ADD \`version\` int NOT NULL`,
    );
  }
}
