import { createConnection, getConnectionOptions } from 'typeorm';
import * as PostgressConnectionStringParser from 'pg-connection-string';

import User from '../models/User';
import Task from '../models/Task';
import Article from '../models/Article';
import Update from '../models/Update';

async function connect(): Promise<void> {
  const connectionOptions = await getConnectionOptions();

  if (process.env.NODE_ENV !== 'dev') {
    const databaseUrl: string = process.env.DATABASE_URL as string;
    const configDatabaseOptions = PostgressConnectionStringParser.parse(
      databaseUrl,
    );

    Object.assign(connectionOptions, {
      host: configDatabaseOptions.host,
      port: Number(configDatabaseOptions.port),
      username: configDatabaseOptions.user,
      password: configDatabaseOptions.password,
      database: configDatabaseOptions.database,
      entities: [Task, Article, Update, User],
      migrations: ['./dist/database/migrations/*.js}'],
      cli: { migrationsDir: './dist/database/migrations' },
      synchronize: true,
      // extra: {
      //   ssl: true,
      // },
    });
  }

  const connection = await createConnection(connectionOptions);
  await connection.runMigrations();

  const firstUser = await connection
    .getRepository(User)
    .createQueryBuilder('user')
    .where('user.username = :username', {
      username: process.env.ADMIN_USERNAME,
    })
    .getOne();

  if (!firstUser) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: process.env.ADMIN_USERNAME,
          name: process.env.ADMIN_NAME,
          password: process.env.ADMIN_PASSWORD,
          permission: 'developer',
        },
      ])
      .execute();
  }
}

connect();
