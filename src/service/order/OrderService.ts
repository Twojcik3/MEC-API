import { IOrderService } from "./IOrderService";
import { ICreateOrderInput } from "../../http/controller/order/input/ICreateOrderInput";
import { IGetOrderDetailsInput } from "../../http/controller/order/input/IGetOrderDetailsInput";
import { injectable, inject } from "inversify";
import { Order } from "../../db/entity/Order";
import { MEC_APP_TYPES } from "../../MecAppTypes";
import { IOrderRepository } from "../../repository/order/IOrderRepository";
import { Product } from "../../db/entity/Product";

@injectable()
export class OrderService implements IOrderService {
    constructor(
        @inject(MEC_APP_TYPES.Repository.OrderRepository) private orderRepository: IOrderRepository
    ){}
    public async getOrder(getOrderDetails: IGetOrderDetailsInput): Promise<Order> {
        const order = await this.orderRepository.getOrderDetailsById(getOrderDetails);
        return order;
    }
    public async createNewOrder(createOrderInput: ICreateOrderInput, productId: string): Promise<void> {
        await this.orderRepository.createNewOrder(createOrderInput, productId);
    }
}