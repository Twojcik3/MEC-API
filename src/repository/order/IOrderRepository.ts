import { Order } from "../../db/entity/Order";
import { IGetOrderDetailsInput } from "../../http/controller/order/input/IGetOrderDetailsInput";
import { ICreateOrderInput } from "../../http/controller/order/input/ICreateOrderInput";
import { Product } from "../../db/entity/Product";

export interface IOrderRepository {
    getOrderDetailsById(getOrderDetails: IGetOrderDetailsInput): Promise<Order>;
    createNewOrder(createORderInput: ICreateOrderInput, productId: string): Promise<void>;
}