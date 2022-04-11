import {MigrationInterface, QueryRunner} from "typeorm";

export class MEC1649442175446 implements MigrationInterface {
    name = 'MEC1649442175446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "name" character varying(320) NOT NULL, "price" integer NOT NULL, "stock" numeric NOT NULL, "productId" character varying NOT NULL, CONSTRAINT "UQ_429540a50a9f1fbf87efd047f35" UNIQUE ("productId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "quantity" numeric NOT NULL, "productId " uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9e2a4f5a89ad20e05323a2e2b23" FOREIGN KEY ("productId ") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9e2a4f5a89ad20e05323a2e2b23"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
