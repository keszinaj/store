import {BelongsToMany, Column, HasMany, IsEmail, Model, Table, Unique} from "sequelize-typescript";
import {Order} from "./order.model";
import {Product} from "./product.model";
import {BasketRelation} from "./basketRelation.model";

@Table
export class User extends Model {
    @Column
    name: string;

    @Column
    surname: string;

    @IsEmail
    @Unique
    @Column
    email: string;

    @Column
    passwordHash: string;

    @Column
    phoneNumber: string;

    @Column
    birthday: Date;

    @Column
    gender: Gender;

    @Column
    country: string;

    @Column
    city: string;

    @Column
    street: string;

    @Column
    postalCode: string

    @HasMany(() => Order)
    orders: Order[]

    @BelongsToMany(() => Product, () => BasketRelation)
    productsInBasket: Product[]
}

export enum Gender {
    Male,
    Female,
    Other
}

