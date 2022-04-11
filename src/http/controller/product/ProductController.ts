import { Request, Response } from 'express-serve-static-core';
import { inject } from 'inversify';
import { AbstractBaseController } from '../AbstractBaseController';
import { MEC_APP_TYPES } from '../../../MecAppTypes';
import { IValidationType } from '../../enum/IValidationType';
import { VALIDATOR_TYPES } from '../../enum/ValidatorTypes';
import { IProductHandler } from '../../../service/product/IProductHandler';

export class ProductController extends AbstractBaseController {
    constructor (
        @inject(MEC_APP_TYPES.Service.Product.Handler) private productHandler: IProductHandler,
        @inject(MEC_APP_TYPES.Service.ValidationServiceFactory) protected validationServiceFactory:
        <T>(validationType: IValidationType<T>) => { validate(obj: unknown): Promise<T> }
    ) {
        super();
    }
    public async getProductDetails(req: Request, res: Response): Promise<void> {
        try {
            const requestValidator = this.validationServiceFactory(VALIDATOR_TYPES.ProductController.GetProductDetails);
            const getProductDetailsInput = await requestValidator.validate({id: req.params.id});
            const productDetails = await this.productHandler.getProductDetails(getProductDetailsInput);
            if (productDetails) {
                res.status(200).send(productDetails)
            } else {
                res.send(400).send('The product does not exist')
            }
            
        } catch (err) {
            res.status(404).send('Error')
        }
    }
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productHandler.getAllProducts();
            if (products) {
                res.status(200).send(products);
            } else {
                res.status(400).send('Not found any products')
            }
            
        } catch (err) {
            res.status(404).send('Error')
        }
    }
    public async getHotDeals(req: Request, res: Response): Promise<void> {
        try {
            const hotDeals = await this.productHandler.getHotDeals();
            if (hotDeals) {
                res.status(200).send(hotDeals);
            } else {
                res.status(400).send('Not found');
            }

        } catch (err) {
            res.status(404).send('Error');
        }
    }
}