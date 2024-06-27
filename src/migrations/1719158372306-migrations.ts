import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1719158372306 implements MigrationInterface {
  name = 'Migrations1719158372306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`lecture_entity\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`lecture_schedule_entity\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`lectureId\` int NOT NULL, \`openDate\` datetime NOT NULL, \`capacity\` int NOT NULL, \`currentEnrollment\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`enrollment_entity\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`lectureScheduleId\` int NOT NULL, UNIQUE INDEX \`IDX_1b0935760f177f3187e4ea2c8a\` (\`userId\`, \`lectureScheduleId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_1b0935760f177f3187e4ea2c8a\` ON \`enrollment_entity\``,
    );
    await queryRunner.query(`DROP TABLE \`enrollment_entity\``);
    await queryRunner.query(`DROP TABLE \`lecture_schedule_entity\``);
    await queryRunner.query(`DROP TABLE \`lecture_entity\``);
  }
}
