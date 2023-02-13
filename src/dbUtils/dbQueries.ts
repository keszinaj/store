import {User} from "../models/user.model";
import {Product} from "../models/product.model";
import {Order, OrderStatus} from "../models/order.model";

export function getAdmin() {
    // TODO: query database for a user and check if he's an admin
    return {
        login: "admin",
        password: "$argon2i$v=19$m=16,t=2,p=1$YXdkdGZneGM$mjr3iMKplxjkI6867RVLmg" //admin
    }
}

export async function getAllUsers() {
    return await User.findAll();
}

export async function getUserById(id: number) {
    return await User.findByPk(id);
}

export async function getUserByEmail(targetEmail: string) {
    let user = await User.findOne({
        where: {
            email: targetEmail
        }
    });
    if (user === null) {
        return Promise.reject(`Couldn't find user with email ${targetEmail} in db.`);
    }
    return user;
}

export async function isEmailUsed(email: string) {
    try {
        await getUserByEmail(email);
        return true;
    } catch {
        return false;
    }
}

/*
Saves specified user to the database.
If the user didn't exist, it creates it with SQL INSERT query.
If the user did exist, it updates it with SQL UPDATE query.
 */
export async function saveUser(user: User) {
    await user.save();
}

export async function getAllProducts() {
    return await Product.findAll();
}

export async function getProductsInOrder(order: Order) {
    const products =  await order.$get("products");
    order.products = products;
    return products;
}

export async function getProductById(productId: number) {
    return await Product.findOne({
        where: {
            id: productId
        }
    });
}

/*
Saves specified product to the database.
If the product didn't exist, it creates it with SQL INSERT query.
If the product did exist, it updates it with SQL UPDATE query.
 */
export async function saveProduct(product: Product) {
    return await product.save();
}

export async function deleteProduct(productId: number) {
    return await Product.destroy({
        where: {
            id: productId
        }
    })
}


export async function getAllOrders() {
    return await Order.findAll();
}

export async function getOrdersOfUser(user: User) {
    return await user.$get("orders");
}

export async function getUserWithOrder(order: Order) {
    return await order.$get("user");
}

export async function getOrderById(id: number) {
    return await Order.findByPk(id);
}

/*
Saves specified order to the database.
If the order didn't exist, it creates it with SQL INSERT query.
If the order did exist, it updates it with SQL UPDATE query.
 */
export async function saveOrder(order: Order) {
    return await order.save();
}

export async function createNewOrder(user: User, products: Product[]) {
    let order = Order.build({
        status: OrderStatus.Pending
    });

    // Send this order record to database
    order = await saveOrder(order);

    // Send info to db that this order contains selected products
    await order.$set("products", products);

    // Send info to db that this order is owned by user.
    await order.$set("user", user);

    return order;
}


export async function addProductToBasket(user: User, product: Product) {
    await user.$add("productsInBasket", product);
}

export async function clearBasket(user: User) {
    await user.$set("productsInBasket", []);
}

export async function removeProductFromBasket(user: User, product: Product) {
    await user.$remove("productsInBasket", product);
}
