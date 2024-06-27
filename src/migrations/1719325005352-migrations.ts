import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719325005352 implements MigrationInterface {
    name = 'Migrations1719325005352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`enrollment_entity\` ADD \`version\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`enrollment_entity\` DROP COLUMN \`version\``);
    }

}
