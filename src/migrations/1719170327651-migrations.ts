import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1719170327651 implements MigrationInterface {
  name = 'Migrations1719170327651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_1b0935760f177f3187e4ea2c8a\` ON \`enrollment_entity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` DROP FOREIGN KEY \`FK_f6e4543be4494ccff29309b84e3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` ADD UNIQUE INDEX \`IDX_5ef961962395ba0bcb6d52579a\` (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` CHANGE \`lectureScheduleId\` \`lectureScheduleId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` ADD CONSTRAINT \`FK_f6e4543be4494ccff29309b84e3\` FOREIGN KEY (\`lectureScheduleId\`) REFERENCES \`lecture_schedule_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` DROP FOREIGN KEY \`FK_f6e4543be4494ccff29309b84e3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` CHANGE \`lectureScheduleId\` \`lectureScheduleId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` DROP INDEX \`IDX_5ef961962395ba0bcb6d52579a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` ADD CONSTRAINT \`FK_f6e4543be4494ccff29309b84e3\` FOREIGN KEY (\`lectureScheduleId\`) REFERENCES \`lecture_schedule_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_1b0935760f177f3187e4ea2c8a\` ON \`enrollment_entity\` (\`userId\`, \`lectureScheduleId\`)`,
    );
  }
}
