import { ICreateOrderInput } from "../../http/controller/order/input/ICreateOrderInput"
import { IGetOrderDetailsInput } from "../../http/controller/order/input/IGetOrderDetailsInput";
import { Order } from "../../db/entity/Order";
export interface IOrderHandler {
    createOrder(createOrder: ICreateOrderInput): Promise<void>;
    getOrderDetails(getOrder: IGetOrderDetailsInput): Promise<Order>;
}