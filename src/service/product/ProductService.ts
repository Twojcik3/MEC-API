import { IProductService } from "./IProductService";
import { injectable, inject } from "inversify";
import { MEC_APP_TYPES } from "../../MecAppTypes";
import { Product } from "../../db/entity/Product";
import { IProductRepository } from "../../repository/product/IProductRepository";

@injectable()
export class ProductService implements IProductService {
    constructor (
        @inject(MEC_APP_TYPES.Repository.ProductRepository) private productRepository: IProductRepository
    ) {}
    public async getProductDetails(id: string): Promise<Product> {
        return await this.productRepository.getProductDetailsById(id);
    }
    public async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAllProducts();
    }
    public async getHotDeals(): Promise<Product[]> {
        return await this.productRepository.getHotDelas();
    }
}