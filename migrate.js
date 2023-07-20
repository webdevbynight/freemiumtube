import 'dotenv/config';
import fs from 'node:fs';
import mysql from 'mysql2/promise';

const migrate = async () =>
    {
        const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env,
            connection = await mysql.createConnection
            ({
                host: DB_HOST,
                port: DB_PORT,
                user: DB_USER,
                password: DB_PASSWORD,
                multipleStatements: true
            }),
            sql = fs.readFileSync('./database.sql', 'utf-8');
            await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
            await connection.query(`CREATE DATABASE ${DB_NAME}`);
            await connection.query(`USE ${DB_NAME}`);
            await connection.query(sql);
            connection.end();
    };

try
{
    migrate();
}
catch(err)
{
    console.error(err);
}
