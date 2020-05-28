import { createConnection, getConnectionOptions } from 'typeorm';
import * as PostgressConnectionStringParser from 'pg-connection-string';

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
      entities: ['./dist/models/*.js'],
      migrations: ['./dist/database/migrations/*.js'],
      cli: { migrationsDir: './dist/database/migrations' },
      synchronize: true,
      extra: {
        ssl: true,
      },
    });
  }

  const connection = await createConnection(connectionOptions);
  await connection.runMigrations();
}

connect();
