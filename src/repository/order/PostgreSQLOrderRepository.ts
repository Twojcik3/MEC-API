import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import { IOrderRepository } from './IOrderRepository';
import { Order } from '../../db/entity/Order';
import { IGetOrderDetailsInput } from '../../http/controller/order/input/IGetOrderDetailsInput';
import { ICreateOrderInput } from '../../http/controller/order/input/ICreateOrderInput';
import "reflect-metadata"; 

@injectable()
@EntityRepository(Order)
export class PostgreSQLOrderRepository extends Repository<Order> implements IOrderRepository {
    public async getOrderDetailsById(getOrderDetails: IGetOrderDetailsInput): Promise<Order> {
        return this.findOne({ where: { _id: getOrderDetails.id } });
    }
    public async createNewOrder(createOrderInput: ICreateOrderInput, productId: string): Promise<void> {
       const order = new Order();
       order.quantity = createOrderInput.quantity;
       order.productId = productId;
       await this.manager.connection.transaction(async manager => {
           await manager.getRepository(Order).save(order);
       }).catch((err) => console.log(err));
    }
}