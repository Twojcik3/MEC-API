import { number } from "yup";
import { Product } from "../../db/entity/Product";

export interface IProductRepository {
    getProductDetailsById(id: string): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getHotDelas(): Promise<Product[]>;
    addProduct(product): Promise<void>;
    updateProduct(product): Promise<void>;
    getByProductStockId(stockId: string): Promise<Product>;
}