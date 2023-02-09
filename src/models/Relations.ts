import {User} from "./User";
import {Product} from "./Product";
import {Order} from "./Order";

function setUpRelations(){
    Order.belongsTo(User);
    User.hasMany(Order);

    Order.belongsToMany(Product, {through: 'OrdersProducts'});
    Product.belongsToMany(Order, {through: 'OrdersProducts'});

    User.belongsToMany(Product, {through: 'Baskets'});
    Product.belongsToMany(User, {through: 'Baskets'});
}

export {setUpRelations}

