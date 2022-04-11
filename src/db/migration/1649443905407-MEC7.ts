import {MigrationInterface, QueryRunner} from "typeorm";

export class MEC71649443905407 implements MigrationInterface {
    name = 'MEC71649443905407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "productId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "productId" character varying NOT NULL`);
    }

}
