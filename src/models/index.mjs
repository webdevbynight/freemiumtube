import 'dotenv/config';
import mysql from 'mysql2/promise';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env,
    pool = mysql.createPool
        ({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME
        });
pool
    .getConnection()
    .catch(() =>
    {
        console.warn('Warning: failed to get a database connection. Did you create a `.env` file with valid credentials? Routes using models will not work as intended.');
    });

export default pool;
