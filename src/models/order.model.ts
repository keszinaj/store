import {BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";
import {Product} from "./product.model";
import {OrderProduct} from "./orderProduct.model";
import {getProductsInOrder} from "../dbUtils/dbQueries";

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

    public static async getOrdersWithTotalPrice(orders: Order[]){
        return await Promise.all(
            orders.map(async order => {
                const products = await getProductsInOrder(order);
                order['totalPrice'] = products.reduce((total, product) => {
                    return total + product.price;
                }, 0);
                return order;
            }));
    }
}

export enum OrderStatus {
    Pending = 0,
    Finished = 1
}