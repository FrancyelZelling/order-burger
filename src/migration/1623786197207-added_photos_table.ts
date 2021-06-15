import {MigrationInterface, QueryRunner} from "typeorm";

export class addedPhotosTable1623786197207 implements MigrationInterface {
    name = 'addedPhotosTable1623786197207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_photos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer, CONSTRAINT "FK_4e7f1b413734d5424ba9902a185" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_photos"("id", "productId") SELECT "id", "productId" FROM "photos"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`ALTER TABLE "temporary_photos" RENAME TO "photos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" RENAME TO "temporary_photos"`);
        await queryRunner.query(`CREATE TABLE "photos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer)`);
        await queryRunner.query(`INSERT INTO "photos"("id", "productId") SELECT "id", "productId" FROM "temporary_photos"`);
        await queryRunner.query(`DROP TABLE "temporary_photos"`);
        await queryRunner.query(`DROP TABLE "photos"`);
    }

}
