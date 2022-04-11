import { MEC_APP_TYPES } from "../MecAppTypes";
import { AppConfig } from "../config/AppConfig";
import { Container } from "inversify";
import { PostgreSQLOrderRepository } from "../repository/order/PostgreSQLOrderRepository";
import { getCustomRepository } from 'typeorm';
import { PostgreSQLProductRepository } from "../repository/product/PostgreSQLProductRepository";
import { IProductRepository } from "../repository/product/IProductRepository";

export function bootstrapRepositories(container: Container): void {
    container.bind(MEC_APP_TYPES.Repository.OrderRepository).toConstantValue(getCustomRepository(PostgreSQLOrderRepository));
    container.bind<IProductRepository>(MEC_APP_TYPES.Repository.ProductRepository).toConstantValue(getCustomRepository(PostgreSQLProductRepository));
}