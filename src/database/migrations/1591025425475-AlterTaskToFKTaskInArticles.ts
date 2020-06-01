import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterTaskToFKTaskInArticles1591025425475
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('articles', 'task');

    await queryRunner.addColumn(
      'articles',
      new TableColumn({
        name: 'fk_task',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'articles',
      new TableForeignKey({
        name: 'article_task',
        columnNames: ['fk_task'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tasks',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('articles', 'article_task');

    await queryRunner.dropColumn('articles', 'fk_task');

    await queryRunner.addColumn(
      'articles',
      new TableColumn({
        name: 'task',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
