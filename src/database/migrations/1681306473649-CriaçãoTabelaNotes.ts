import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaçãoTabelaNotes1681306473649 implements MigrationInterface {
    name = 'CriaçãoTabelaNotes1681306473649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message"."message" DROP CONSTRAINT "message_id_usuario_fkey"`);
        await queryRunner.query(`ALTER TABLE "message"."user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "message"."user" ADD "name" character varying(30)`);
        await queryRunner.query(`ALTER TABLE "message"."message" ADD CONSTRAINT "FK_55803df68e9d91464a84c9598dd" FOREIGN KEY ("id_usuario") REFERENCES "message"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message"."message" DROP CONSTRAINT "FK_55803df68e9d91464a84c9598dd"`);
        await queryRunner.query(`ALTER TABLE "message"."user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "message"."user" ADD "name" character(30)`);
        await queryRunner.query(`ALTER TABLE "message"."message" ADD CONSTRAINT "message_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "message"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
