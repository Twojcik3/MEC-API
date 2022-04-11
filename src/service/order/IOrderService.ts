import { ICreateOrderInput } from "../../http/controller/order/input/ICreateOrderInput";
import { IGetOrderDetailsInput } from "../../http/controller/order/input/IGetOrderDetailsInput";
import { Order } from "../../db/entity/Order";
import { Product } from "../../db/entity/Product";

export interface IOrderService {
    getOrder(getOrderDetails: IGetOrderDetailsInput): Promise<Order>;
    createNewOrder(createOrderInput: ICreateOrderInput, productId: string): Promise<void>;
}