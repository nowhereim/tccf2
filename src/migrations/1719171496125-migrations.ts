import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719171496125 implements MigrationInterface {
    name = 'Migrations1719171496125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5ef961962395ba0bcb6d52579a\` ON \`enrollment_entity\``);
        await queryRunner.query(`ALTER TABLE \`enrollment_entity\` CHANGE \`lectureSchedule\` \`lectureScheduleId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1b0935760f177f3187e4ea2c8a\` ON \`enrollment_entity\` (\`userId\`, \`lectureScheduleId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_1b0935760f177f3187e4ea2c8a\` ON \`enrollment_entity\``);
        await queryRunner.query(`ALTER TABLE \`enrollment_entity\` CHANGE \`lectureScheduleId\` \`lectureSchedule\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5ef961962395ba0bcb6d52579a\` ON \`enrollment_entity\` (\`userId\`)`);
    }

}
