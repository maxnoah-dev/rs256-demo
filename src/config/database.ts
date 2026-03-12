import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const dbPort = Number(process.env.DB_PORT ?? 3306);

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number.isNaN(dbPort) ? 3306 : dbPort,
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'demo',
});

const prisma = new PrismaClient({ adapter });

export default prisma;