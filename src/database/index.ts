import { createConnection } from 'typeorm';

if (process.env.NODE_ENV === 'dev')
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
else
  createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'telee',
    database: 'telee',
    entities: ['./dist/models/*.js'],
    migrations: ['./dist/database/migrations/*.js'],
    cli: {
      migrationsDir: './dist/database/migrations',
    },
  });
