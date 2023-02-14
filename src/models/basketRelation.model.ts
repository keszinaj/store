import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";
import {Product} from "./product.model";

@Table
export class BasketRelation extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;
}