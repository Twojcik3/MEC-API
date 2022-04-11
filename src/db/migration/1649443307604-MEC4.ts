import {MigrationInterface, QueryRunner} from "typeorm";

export class MEC41649443307604 implements MigrationInterface {
    name = 'MEC41649443307604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd858ab13e304f0b6f806800710"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "productID " TO "productId "`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9e2a4f5a89ad20e05323a2e2b23" FOREIGN KEY ("productId ") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9e2a4f5a89ad20e05323a2e2b23"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "productId " TO "productID "`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd858ab13e304f0b6f806800710" FOREIGN KEY ("productID ") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
