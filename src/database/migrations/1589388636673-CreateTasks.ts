import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTasks1589388636673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'author',
            type: 'varchar',
          },
          {
            name: 'keyword',
            type: 'varchar',
          },
          {
            name: 'sub_keywords',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'website',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'writer',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'assumed',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'delivered',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'words',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'article',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
