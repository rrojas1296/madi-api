const DB_HOST = process.env.POSTGRES_HOST || 'database';
const DB_PORT = parseInt(process.env.POSTGRES_PORT as string) || 5432;
const DB_USER = process.env.POSTGRES_USER || 'postgres';
const DB_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';
const DB_NAME = process.env.POSTGRES_DB || 'db-madi';

export { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME };
