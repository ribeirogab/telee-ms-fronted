import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterWriterToFKWriterInArticles1591023855881
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('articles', 'writer');

    await queryRunner.addColumn(
      'articles',
      new TableColumn({
        name: 'fk_writer',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'articles',
      new TableForeignKey({
        name: 'article_writer',
        columnNames: ['fk_writer'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('articles', 'article_writer');

    await queryRunner.dropColumn('articles', 'fk_writer');

    await queryRunner.addColumn(
      'articles',
      new TableColumn({
        name: 'writer',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
