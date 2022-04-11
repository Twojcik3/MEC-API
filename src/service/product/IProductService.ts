import { Product } from "../../db/entity/Product";

export interface IProductService {
    getProductDetails(id: string): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getHotDeals(): Promise<Product[]>;
}