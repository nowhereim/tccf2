import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719332810911 implements MigrationInterface {
    name = 'Migrations1719332810911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`enrollment_entity\` DROP COLUMN \`version\``);
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` ADD \`version\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` DROP COLUMN \`version\``);
        await queryRunner.query(`ALTER TABLE \`enrollment_entity\` ADD \`version\` int NOT NULL`);
    }

}
