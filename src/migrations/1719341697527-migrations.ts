import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719341697527 implements MigrationInterface {
    name = 'Migrations1719341697527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecture_entity\` DROP COLUMN \`version\``);
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` ADD \`version\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` DROP COLUMN \`version\``);
        await queryRunner.query(`ALTER TABLE \`lecture_entity\` ADD \`version\` int NOT NULL`);
    }

}
