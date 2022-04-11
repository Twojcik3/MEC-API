import { Request, Response } from 'express-serve-static-core';
import { inject } from 'inversify';
import { AbstractBaseController } from '../AbstractBaseController';
import { MEC_APP_TYPES } from '../../../MecAppTypes';
import { IValidationType } from '../../enum/IValidationType';
import { VALIDATOR_TYPES } from '../../enum/ValidatorTypes';
import { IOrderHandler } from '../../../service/order/IOrderHandler';

export class OrderController extends AbstractBaseController {
    constructor (
        @inject(MEC_APP_TYPES.Service.Order.Handler) private orderHandler: IOrderHandler,
        @inject(MEC_APP_TYPES.Service.ValidationServiceFactory) protected validationServiceFactory:
        <T>(validationType: IValidationType<T>) => { validate(obj: unknown): Promise<T> }
    ){
        super()
    }

    public async createOrder(req: Request, res: Response): Promise<void> {
        try {
            console.log('creating new order');
            console.log(req.params);
            const requestValidator = this.validationServiceFactory(VALIDATOR_TYPES.OrderController.CreateOrder);
            const createOrderInput = await requestValidator.validate({...req.params});
            await this.orderHandler.createOrder(createOrderInput);
            res.status(200).send('Order has been created.')
        } catch (err) {
            res.status(400).send('Lack in stock')
        }
    }

    public async getOrderDetails(req: Request, res: Response): Promise<void> {
        try {
            const requestValidator = this.validationServiceFactory(VALIDATOR_TYPES.OrderController.GetOrder);
            const getOrderDetailsInput = await requestValidator.validate({...req.params});
            const order = await this.orderHandler.getOrderDetails(getOrderDetailsInput);
            res.status(200).send(order);
        } catch (err) {
            res.status(404).send('Not found order');
        }
    }
}