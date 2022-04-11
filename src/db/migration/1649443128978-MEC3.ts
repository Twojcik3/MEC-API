import {MigrationInterface, QueryRunner} from "typeorm";

export class MEC31649443128978 implements MigrationInterface {
    name = 'MEC31649443128978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd858ab13e304f0b6f806800710"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "productID " SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd858ab13e304f0b6f806800710" FOREIGN KEY ("productID ") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd858ab13e304f0b6f806800710"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "productID " DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd858ab13e304f0b6f806800710" FOREIGN KEY ("productID ") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
