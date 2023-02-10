import {BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";
import {Product} from "./product.model";
import {OrderProduct} from "./orderProduct.model";

@Table
export class Order extends Model {
    @Column
    status: OrderStatus;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => Product, () => OrderProduct)
    products: Product[];
}

export enum OrderStatus {
    Pending,
    Finished
}