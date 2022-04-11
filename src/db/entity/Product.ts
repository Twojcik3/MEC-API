import 'reflect-metadata';
import {Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from './BaseEntity';
import { Order } from './Order';

@Entity()
export class Product extends BaseEntity {
    @OneToMany(() => Order, order => order.product)
    public orders: Order[];

    @Column({ name: 'name' , length: 320, nullable: false })
    protected _name: string;

    public set name(value: string) {
        this._name = value;
    }

    public get name(): string {
        return this._name;
    }

    @Column({ name: 'price', nullable: false })
    protected _price: number;

    public set price(value: number) {
        this._price = value;
    }

    public get price(): number {
        return this._price;
    }

    @Column({ type: 'numeric', name: 'stock', nullable: false })
    protected _stock: number;

    public set stock(value: number) {
        this._stock = value;
    }

    public get stock(): number {
        return this._stock;
    }

    @Column({ name: 'stockProductId', unique: true, nullable: false})
    protected _stockProductId: string;

    public set stockProductId(value: string) {
        this._stockProductId = value;
    }

    public get stockProductId(): string {
        return this._stockProductId;
    }
}