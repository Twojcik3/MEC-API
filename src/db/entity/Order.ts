import 'reflect-metadata';
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity()
export class Order extends BaseEntity {
    @ManyToOne(() => Product, product => product.orders)
    @JoinColumn({ name: 'productId'})
    public product: Product;

    @Column()
    public productId: string;

    @Column({ type: 'numeric', name: 'quantity' })
    protected _quantity: number;

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(value: number) {
        this._quantity = value;
    }
}