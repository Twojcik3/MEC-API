import { DbConfig } from '../../config/db/DbConfig';
import * as pg from 'pg';

export class DataBaseCreator {
    private connectionString: string;
    private dbConfig: DbConfig;
    private client: pg.Client;

    constructor(dbConfig: DbConfig) {
        this.dbConfig = dbConfig;
        this.connectionString = `${dbConfig.driver}://${dbConfig.userName}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/postgres`;
        this.client = new pg.Client(this.connectionString);
    }

    public async create(): Promise<boolean> {
        const createDatabaseQuery = `CREATE DATABASE ${this.dbConfig.database}`;
        const checkDatabaseQuery = `SELECT 1 from pg_database WHERE datname='${this.dbConfig.database}'`;
        try {
            await this.client.connect();
            const existRes = await this.client.query(checkDatabaseQuery);
            if (!this.databaseAlreadyExist(existRes)) {
                console.log(`Database ${this.dbConfig.database} does not exist, creating database`);
                await this.client.query(createDatabaseQuery);
                console.log(`Database ${this.dbConfig.database} created`);
                return true;
            } else {
                console.log(`Database ${this.dbConfig.database} already exist`);
                return false;
            }
        } catch (err) {
            console.log(`Cannot create database ${this.dbConfig.database}`, err);
            process.exit(1);
        } finally {
            await this.client.end();
        }
    }

    private databaseAlreadyExist(existRes: any): boolean {
        return existRes.rowCount > 0;
    }
}