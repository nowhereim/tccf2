import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719166165018 implements MigrationInterface {
    name = 'Migrations1719166165018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` CHANGE \`lectureId\` \`lectureId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`enrollment_entity\` ADD CONSTRAINT \`FK_f6e4543be4494ccff29309b84e3\` FOREIGN KEY (\`lectureScheduleId\`) REFERENCES \`lecture_schedule_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` ADD CONSTRAINT \`FK_8a40847189b96aa65cd7a5af309\` FOREIGN KEY (\`lectureId\`) REFERENCES \`lecture_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` DROP FOREIGN KEY \`FK_8a40847189b96aa65cd7a5af309\``);
        await queryRunner.query(`ALTER TABLE \`enrollment_entity\` DROP FOREIGN KEY \`FK_f6e4543be4494ccff29309b84e3\``);
        await queryRunner.query(`ALTER TABLE \`lecture_schedule_entity\` CHANGE \`lectureId\` \`lectureId\` int NOT NULL`);
    }

}
