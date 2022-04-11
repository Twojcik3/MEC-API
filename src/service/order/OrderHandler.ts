import { IOrderHandler } from "./IOrderHandler";
import { IOrderService } from "./IOrderService";
import { inject, injectable } from "inversify";
import { MEC_APP_TYPES } from "../../MecAppTypes";
import { ICreateOrderInput } from "../../http/controller/order/input/ICreateOrderInput";
import { IGetOrderDetailsInput } from "../../http/controller/order/input/IGetOrderDetailsInput";
import { Order } from "../../db/entity/Order";
import { IProductService } from "../product/IProductService";
import { ProductDoesNotExistError } from "../../error/product/ProductDoesNotExistError";
import { InsufficientQuantityProductError } from "../../error/product/InsufficientQuantityProductError";

@injectable()
export class OrderHandler implements IOrderHandler {
    constructor(
        @inject(MEC_APP_TYPES.Service.Order.Service) private orderService: IOrderService,
        @inject(MEC_APP_TYPES.Service.Product.Service) private productService: IProductService
    ){}

    public async createOrder(createOrder: ICreateOrderInput): Promise<void>{
        console.log('OrderHandler, creating new order');    
        const product = await this.productService.getProductDetails(createOrder.id);
        if (!product) {
            throw new ProductDoesNotExistError('Product does not exist');
        };
        if (product.stock < createOrder.quantity ) {
            throw new InsufficientQuantityProductError('Insufficient quantity of the product')
        };
        console.log(product)
        await this.orderService.createNewOrder(createOrder, product.id);
    }

    public async getOrderDetails(getOrder: IGetOrderDetailsInput): Promise<Order> {
        const order = await this.orderService.getOrder(getOrder);
        return order;
    }
}