import { DbConfig } from "../config/db/dbConfig";
import { createConnection  } from "typeorm";
import { ConnectionConfigFactory } from "./ConnectionConfig";

const DB_RECONNECTION_TIMEOUT = 5000;

export class DbConnector {
    public async connect(dbConfig: DbConfig, connectionConfigFactory: ConnectionConfigFactory): Promise<void> {
        return new Promise(async (resolve) => {
            try {
                await createConnection({...connectionConfigFactory.create()});
                console.log(`Database connected ${dbConfig.host}:${dbConfig.port}`);
                resolve();
            } catch (err) {
                console.log(err);
                console.log(`Cannot connect database ${dbConfig.host}:${dbConfig.port}, reconnecting in ${DB_RECONNECTION_TIMEOUT}s`);
                setTimeout(async () => {
                    await this.connect(dbConfig, connectionConfigFactory);
                }, DB_RECONNECTION_TIMEOUT);
            }
        })
    }
}