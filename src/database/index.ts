import * as PostgressConnectionStringParser from 'pg-connection-string';
import { createConnection } from 'typeorm';

if (process.env.NODE_ENV === 'dev') {
  const databaseUrl: string = process.env.DATABASE_URL as string;
  const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);

  createConnection({
    type: 'postgres',
    host: connectionOptions.host as string,
    port: Number(connectionOptions.port),
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database as string,
    synchronize: true,
    entities: ['target/entity/**/*.js'],
    extra: {
      ssl: true,
    },
  });
} else {
  createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'telee',
    database: 'telee',
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations',
    },
  });
}
