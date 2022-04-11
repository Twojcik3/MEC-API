import "reflect-metadata";
import { Container } from 'inversify';
import { DbConnector } from "./db/DbConnector";
import { DbConfig } from "./config/db/DbConfig";
import { ConnectionConfigFactory } from "./db/ConnectionConfig";
import { AppConfig } from "./config/AppConfig";
import { Runtime } from './Runtime';
import { bootstrap } from "./Bootstrap";
import { DataBaseCreator } from "./db/seed/DataBaseCreator";

const dbConfigObject = {
    driver: 'driver',
    host: 'localhost',
    port: 5432,
    userName: 'postgres',
    password: 'dev',
    logging: false,
    database: 'mec',
};
const appConfigObject = {
    port: 8000,
    endpoint: 'http://127.0.0.1:8000/',
    ...dbConfigObject,
};
(async (): Promise<void> => {
    console.log('Start');
    const dbConfig = new DbConfig();
    dbConfig.deserialize(dbConfigObject);
    const appConfig = new AppConfig();
    appConfig.deserialize(appConfigObject);
    const container = new Container();
    const connectionConfigFactory = new ConnectionConfigFactory(dbConfig);
    const databaseCreator = new DataBaseCreator(dbConfig);
    await databaseCreator.create();
    try {
        const dbConnector = new DbConnector();
        await dbConnector.connect(dbConfig, connectionConfigFactory);
        await bootstrap(appConfig, container);
        const runtime = new Runtime(container);
        runtime.startHttpServer(appConfig);
        const WebSocket = require('ws');
        const connection = new WebSocket('wss://mec-storage.herokuapp.com');
        let products;
        connection.onmessage = async e => {
            const data = JSON.parse(e.data);
            if (!data.operation) {
                //add new product to the database
                products = data.map((el) => {
                    return el;
                });
                await runtime.addDataToDB(products);
            } else {
                if (data.operation === "product.stock.updated") {
                    console.log(data);
                    await runtime.updateProductInDB(data.payload.productId, data.payload.stock)
                }
            }
        }
    } catch (err) {
        console.log(`Cannot run server ${err}`);
    }
})();