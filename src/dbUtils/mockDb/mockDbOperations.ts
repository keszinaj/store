import {
    addProductToBasket, clearBasket,
    createNewOrder,
    getAllProducts, getProductById, getProductsInBasket,
    getUserByEmail, removeProductIdFromBasket,
    saveProduct,
    saveUser
} from "../dbQueries";
import {mockProducts, mockUsers} from "./mockData";
import {User} from "../../models/user.model";

export async function fillDbWithMockData(){
    await addUsers();
    await addProducts();
    await addOrders();
    await testBasket();
}

export async function addUsers() {
    await Promise.all(
        mockUsers.map(async (usr) => await saveUser(usr))
    )
}

export async function addProducts() {
    await Promise.all(
        mockProducts.map(async (product) => await saveProduct(product))
    )
}

export async function addOrder(userEmail: string, productIds: number[]) {
    let products = await getAllProducts().then(prods =>
        prods.filter(
            prod => productIds.includes(prod.id)
        )
    )

    if (products.length === 0) {
        return Promise.reject("Couldn't find any product with specified id");
    }

    let user = await getUserByEmail(userEmail);

    await createNewOrder(user, products);
}

export async function addOrders(){
    await addOrder(mockUsers[0].email, [4, 6, 7]);
    await addOrder(mockUsers[1].email, [2, 4, 5, 6]);
    await addOrder(mockUsers[2].email, [1, 2]);


    // Read order and products of user
    let user1 = await getUserByEmail(mockUsers[1].email);
    let order1 = await user1.$get("orders").then(ord => ord[0]);
    let products1 = await order1.$get("products");
    console.log(`\nUser ${user1.email}\n has order ${order1.id}\n with products ${products1.map(prod => prod.name)}\n`);
}

export async function addToBasket(user: User, productId: number){
    let product = await getProductById(productId);
    if (product === null){
        return Promise.reject(`Can't find product with id ${productId}`);
    }
    await addProductToBasket(user, product);
}




export async function testBasket(){
    let user = await getUserByEmail(mockUsers[0].email);

    await addToBasket(user, 2);
    await addToBasket(user, 4);
    await addToBasket(user, 5);
    let basket1 = await getProductsInBasket(user).then(prods => prods.map(prod => prod.name));
    console.log(`\nBasket after add: ${basket1}\n`);

    await removeProductIdFromBasket(user, 4);
    let basket2 = await getProductsInBasket(user).then(prods => prods.map(prod => prod.name));
    console.log(`\nBasket after remove: ${basket2}\n`);

    await clearBasket(user);
    let basket3 = await getProductsInBasket(user).then(prods => prods.map(prod => prod.name));
    console.log(`\nBasket after clear: ${basket3}\n`);
}