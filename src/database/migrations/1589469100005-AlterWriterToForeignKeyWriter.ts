import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterWriterToForeignKeyWriter1589469100005
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tasks', 'writer');

    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'fk_writer',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'task_writer',
        columnNames: ['fk_writer'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tasks', 'task_writer');

    await queryRunner.dropColumn('tasks', 'fk_writer');

    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'writer',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
