import {MigrationInterface, QueryRunner} from "typeorm";

export class MEC81649444103638 implements MigrationInterface {
    name = 'MEC81649444103638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9e2a4f5a89ad20e05323a2e2b23"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "productId " TO "productId"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "productId" TO "productId "`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9e2a4f5a89ad20e05323a2e2b23" FOREIGN KEY ("productId ") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
