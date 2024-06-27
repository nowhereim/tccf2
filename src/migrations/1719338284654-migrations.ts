import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719338284654 implements MigrationInterface {
    name = 'Migrations1719338284654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` ADD \`version\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` DROP COLUMN \`version\``);
    }

}
