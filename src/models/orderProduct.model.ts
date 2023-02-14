import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {Order} from "./order.model";
import {Product} from "./product.model";

@Table
export class OrderProduct extends Model {
    @ForeignKey(() => Order)
    @Column
    orderId: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;
}