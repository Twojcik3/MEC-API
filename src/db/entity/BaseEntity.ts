import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    protected _id: string;

    @DeleteDateColumn({ name: 'deletedAt' })
    protected _deletedAt?: Date;

    @Column({ name: 'createdAt' })
    protected _createdAt: Date;

    @Column({ name: 'modifiedAt' })
    protected _modifiedAt: Date;

    @BeforeInsert()
    private setCreatedAt(): void {
        this._createdAt = new Date();
    }

    @BeforeUpdate()
    @BeforeInsert()
    private setModifiedAt(): void {
        this._modifiedAt = new Date();
    }

    public get id(): string {
        return this._id;
    }

    public get deleted(): Date {
        return this._deletedAt;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get modifiedAt(): Date {
        return this._modifiedAt;
    }
}