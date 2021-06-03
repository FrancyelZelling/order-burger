import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusOrder1622725953438 implements MigrationInterface {
    name = 'addStatusOrder1622725953438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "total" integer, "orderStatus" varchar DEFAULT ('completed'), CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "customerId", "total") SELECT "id", "customerId", "total" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "total" integer, CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "order"("id", "customerId", "total") SELECT "id", "customerId", "total" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
    }

}
