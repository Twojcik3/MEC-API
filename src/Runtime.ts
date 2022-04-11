import { Container, inject, injectable } from 'inversify';
import * as express from "express";
import * as http from 'http';
import { IRoutesManager } from './service/router/IRoutesManager';
import { MEC_APP_TYPES } from './MecAppTypes';
import { AppConfig } from './config/AppConfig';
import * as url from 'url';
import * as cors from 'cors';
import { IProductRepository } from './repository/product/IProductRepository';

export class Runtime {
    constructor (
        protected container: Container,
        @inject(MEC_APP_TYPES.Repository.ProductRepository) private productRepository?: IProductRepository
    ){}
    
    public startHttpServer(appConfig: AppConfig){
        console.log('RunTime, starting Http server');
        const app = express(); 
        app.use(cors({
            credentials: true,
            origin: true,
        })); 
        const routesManager = this.container.get<IRoutesManager>(MEC_APP_TYPES.Http.Routes.RoutesManager);
        routesManager.register(app);
        const listenURL = url.parse(appConfig.endpoint);
        console.log(`Listenning ${listenURL.host}`)
        const server = http.createServer(app).listen(listenURL.port);
        return server;
    }
    public async addDataToDB(products): Promise<void> {
        const repo = this.container.get<IProductRepository>(MEC_APP_TYPES.Repository.ProductRepository);
        for(const product of products) {
           try {
            const productToAdd = {
                name: product.name,
                price: product.price,
                stockProductId: product.productId.toString(),
                stock: product.stock
            }
            //await repo.addProduct(productToAdd); 
            console.log(`product ${product.name} added to database`)  
           } catch (err) {
                console.log(err);
           }
        }
    }

    public async updateProductInDB(productId: number, stock: number) {
        const repo = this.container.get<IProductRepository>(MEC_APP_TYPES.Repository.ProductRepository);
        const product = await repo.getByProductStockId(productId.toString());
        if (product) {
            product.stock = stock;
            await repo.updateProduct(product);
            console.log(`Product ${product.name} has been updated`);
        }
    }
}