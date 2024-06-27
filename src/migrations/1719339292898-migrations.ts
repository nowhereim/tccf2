import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719339292898 implements MigrationInterface {
    name = 'Migrations1719339292898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecture_entity\` ADD \`version\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecture_entity\` DROP COLUMN \`version\``);
    }

}
