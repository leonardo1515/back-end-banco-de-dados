import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class migrations1680626132884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            //    primaryKeyConstraintName:"id_user",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "string",
            length: "30",
            isNullable: true,
          },
          {
            name: "email",
            type: "string",
            isUnique: true,
          },
          {
            name: "password",
            type: "string",
          },
          {
            name: "staus",
            type: "boolean",
            default: false,
          },
          {
            name: "dt_create",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "dt_update",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: "message",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "message",
            type: "string",
          },
          {
            name: "descript",
            type: "string",
          },
          {
            name: "save",
            type: "boolean",
            default: false,
          },
          {
            name: "dt_create",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "dt_update",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
