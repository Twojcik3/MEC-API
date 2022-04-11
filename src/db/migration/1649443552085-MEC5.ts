import {MigrationInterface, QueryRunner} from "typeorm";

export class MEC51649443552085 implements MigrationInterface {
    name = 'MEC51649443552085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "productId" TO "stockProductId"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "UQ_429540a50a9f1fbf87efd047f35" TO "UQ_9d1af047c173c0f8dd3afc60a1b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME CONSTRAINT "UQ_9d1af047c173c0f8dd3afc60a1b" TO "UQ_429540a50a9f1fbf87efd047f35"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "stockProductId" TO "productId"`);
    }

}
