import { IGetProductDetailsInput } from "../../http/controller/product/input/IGetProductDetailsInput";
import { Product } from "../../db/entity/Product";

export interface IProductHandler {
    getProductDetails(productDetails: IGetProductDetailsInput): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getHotDeals(): Promise<Product[]>;
}