import { DbConfig } from "../config/db/dbConfig";
import { ConnectionOptions } from "typeorm";
import { Order } from "./entity/Order";
import { Product } from "./entity/Product";

export class ConnectionConfigFactory {
    private dbConfig: DbConfig

    constructor(dbConfig: DbConfig) {
        this.dbConfig = dbConfig;
    }

    public create(): ConnectionOptions {
        return {
            database: this.dbConfig.database,
            entities: [
                Order,
                Product
            ],
            host: this.dbConfig.host,
            password: this.dbConfig.password,
            port: this.dbConfig.port,
            type: 'postgres',
            username: this.dbConfig.userName,
            synchronize: false,
            logging: false,
        }
    }
}