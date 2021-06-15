import {MigrationInterface, QueryRunner} from "typeorm";

export class addedCreatedUpdatedAtORDER1623784850851 implements MigrationInterface {
    name = 'addedCreatedUpdatedAtORDER1623784850851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "total" integer, "orderStatus" varchar DEFAULT ('completed'), "created_at" datetime, "updated_at" datetime, CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "customerId", "total", "orderStatus") SELECT "id", "customerId", "total", "orderStatus" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "total" integer, "orderStatus" varchar DEFAULT ('completed'), CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "order"("id", "customerId", "total", "orderStatus") SELECT "id", "customerId", "total", "orderStatus" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
    }

}
