import { IProductRepository } from "./IProductRepository";
import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from "../../db/entity/Product";

@injectable()
@EntityRepository(Product)
export class PostgreSQLProductRepository extends Repository<Product> implements IProductRepository {
    public async getProductDetailsById(id: string): Promise<Product> {
        return this.findOne({ where: { _id: id } });
    };

    public async getByProductStockId(stockId: string): Promise<Product> {
        return this.findOne({ where: { _stockProductId: stockId }})
    }
    public async getAllProducts(): Promise<Product[]> {
        const query = this.createQueryBuilder('p')
        .select('*')
        .orderBy('p."createdAt"', 'DESC');
        return query.execute();
    };

    public async getHotDelas(): Promise<Product[]> {
        const query = this.createQueryBuilder('p')
            .select(['p."name", p."stockProductId", SUM(o."quantity") as "sumQuantity"'])
            .innerJoin('order', 'o', 'p."id" = o."productId"')
            .groupBy('p."name", p."stockProductId"')
            .orderBy('"sumQuantity"', 'DESC');
        return query.execute();
    };

    public async addProduct(product): Promise<void> {
        const productToDb = new Product();
        productToDb.name = product.name;
        productToDb.stock = product.stock;
        productToDb.stockProductId = product.stockProductId;
        productToDb.price = product.price;
       await this.manager.connection.transaction(async manager => {
           await manager.getRepository(Product).save(productToDb);
       }).catch((err) => console.log(err));
    };
    public async updateProduct(updateProduct): Promise<void>{
        await this.manager.connection.transaction(async manager => {
            await manager.getRepository(Product).save(updateProduct);
        })
    }
}