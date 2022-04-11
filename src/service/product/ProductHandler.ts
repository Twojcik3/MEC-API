import { injectable, inject } from "inversify";
import { IProductHandler } from "./IProductHandler";
import { IProductService } from "./IProductService";
import { MEC_APP_TYPES } from "../../MecAppTypes";
import { IGetProductDetailsInput } from "../../http/controller/product/input/IGetProductDetailsInput";
import { Product } from "../../db/entity/Product";

@injectable()
export class ProductHandler implements IProductHandler {
    constructor(
        @inject(MEC_APP_TYPES.Service.Product.Service) private productService: IProductService
    ){}
    
    public async getProductDetails(productDetails: IGetProductDetailsInput): Promise<Product> {
        const product = await this.productService.getProductDetails(productDetails.id);
        return product;
    };

    public async getAllProducts(): Promise<Product[]> {
        const products = await this.productService.getAllProducts();
        return products;
    };
    public async getHotDeals(): Promise<Product[]> {
        const hotDeals = await this.productService.getHotDeals();
        return hotDeals;
    }
}