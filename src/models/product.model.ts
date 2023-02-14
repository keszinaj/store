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

    @Column
    price: number;

    @Column
    amountAvailable: number;

    @Column
    photoPath: string;

    @Column(DataType.TEXT) //TEXT datatype has unlimited length
    details: string;

    @BelongsToMany(() => User, () => BasketRelation)
    usersWhoHaveThisProductInBasket: User[];

    @BelongsToMany(() => Order, () => OrderProduct)
    orders: Order[];

    public getPartialInfo(){
        return {
            id: this.id,
            name: this.name,
            cpu: this.cpu,
            memory: this.memory,
            graphics: this.graphics,
            price: this.price,
            amountAvailable: this.amountAvailable,
            photoPath: this.photoPath
        }
    }
}