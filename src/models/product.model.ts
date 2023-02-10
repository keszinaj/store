import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";
import {BasketRelation} from "./basketRelation.model";
import {Order} from "./order.model";
import {OrderProduct} from "./orderProduct.model";

@Table
export class Product extends Model {
    @Column
    name: string;

    @Column
    cpu: string;

    @Column
    memory: string;

    @Column
    graphics: string;

    @Column(DataType.DECIMAL(2))
    price: number;

    @Column
    amountAvailable: number;

    @Column
    photoPath: string;

    @Column
    details: string;

    @BelongsToMany(() => User, () => BasketRelation)
    usersWhoHaveThisProductInBasket: User[];

    @BelongsToMany(() => Order, () => OrderProduct)
    orders: Order[]
}