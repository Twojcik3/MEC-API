import { MEC_APP_TYPES } from "../MecAppTypes";
import { IOrderHandler } from "../service/order/IOrderHandler";
import { IOrderService } from "../service/order/IOrderService";
import { OrderHandler } from "../service/order/OrderHandler";
import { OrderService } from "../service/order/OrderService";
import { AppConfig } from "../config/AppConfig";
import { Container } from "inversify";
import { IProductHandler } from "../service/product/IProductHandler";
import { IProductService } from "../service/product/IProductService";
import { ProductService } from "../service/product/ProductService";
import { ProductHandler } from "../service/product/ProductHandler";

export async function bootstrapServices(appConfig: AppConfig, container: Container): Promise<void> {
    container.bind<IOrderHandler>(MEC_APP_TYPES.Service.Order.Handler).to(OrderHandler);
    container.bind<IOrderService>(MEC_APP_TYPES.Service.Order.Service).to(OrderService);
    container.bind<IProductHandler>(MEC_APP_TYPES.Service.Product.Handler).to(ProductHandler);
    container.bind<IProductService>(MEC_APP_TYPES.Service.Product.Service).to(ProductService);
}