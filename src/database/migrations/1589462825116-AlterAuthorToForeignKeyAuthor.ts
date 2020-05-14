import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterAuthorToForeignKeyAuthor1589462825116
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tasks', 'author');

    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'fk_author',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'task_author',
        columnNames: ['fk_author'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tasks', 'task_author');

    await queryRunner.dropColumn('tasks', 'fk_author');

    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'author',
        type: 'varchar',
      }),
    );
  }
}
