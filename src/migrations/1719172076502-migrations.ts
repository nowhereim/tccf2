import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1719172076502 implements MigrationInterface {
  name = 'Migrations1719172076502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` DROP FOREIGN KEY \`FK_f6e4543be4494ccff29309b84e3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` DROP FOREIGN KEY \`FK_8a40847189b96aa65cd7a5af309\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1b0935760f177f3187e4ea2c8a\` ON \`enrollment_entity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` CHANGE \`lectureId\` \`lecture\` int NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_6994bc5fd7a1c42628297dda4d\` ON \`enrollment_entity\` (\`userId\`, \`lectureSchedule\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` ADD CONSTRAINT \`FK_cdbeb8a419922a5ac15c7bdfac5\` FOREIGN KEY (\`lectureSchedule\`) REFERENCES \`lecture_schedule_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` ADD CONSTRAINT \`FK_24807a578e1eb848ecaff8b6703\` FOREIGN KEY (\`lecture\`) REFERENCES \`lecture_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` DROP FOREIGN KEY \`FK_24807a578e1eb848ecaff8b6703\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` DROP FOREIGN KEY \`FK_cdbeb8a419922a5ac15c7bdfac5\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6994bc5fd7a1c42628297dda4d\` ON \`enrollment_entity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` CHANGE \`lecture\` \`lectureId\` int NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_1b0935760f177f3187e4ea2c8a\` ON \`enrollment_entity\` (\`userId\`, \`lectureSchedule\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lecture_schedule_entity\` ADD CONSTRAINT \`FK_8a40847189b96aa65cd7a5af309\` FOREIGN KEY (\`lectureId\`) REFERENCES \`lecture_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`enrollment_entity\` ADD CONSTRAINT \`FK_f6e4543be4494ccff29309b84e3\` FOREIGN KEY (\`lectureSchedule\`) REFERENCES \`lecture_schedule_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
