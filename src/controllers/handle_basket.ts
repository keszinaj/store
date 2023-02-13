import {
    clearBasket,
    createNewOrder,
    getProductsInBasket,
    removeProductIdFromBasket
} from "../dbUtils/dbQueries";
import {tryGetUser} from "./utils";

//for payment config
const stripe = require('stripe')("sk_test_51Mae79DsMkUfjELNFGqTadfXlVJo48xS4ekh0R1FhdngnYb1HGdL3xlDWQsK6TK3IxwpX8yPR7v2aVwupj8CnzjC00C5uwJki6")

/**
 * Function render basket page
 */
export async function renderBasket(req, res){
    const user = await tryGetUser(req, res);
    if (user === null) {
        return;
    }
   
    //handle delete button
    if(typeof req.query.id === 'string')
    {
        let productId = parseInt(req.query.id);
        await removeProductIdFromBasket(user, productId);
    }

    const products = await getProductsInBasket(user);
    const cost = products.reduce(
        (sum, product) => sum + product.price,
        0);

    res.render('user/cart', { products: products, cost: cost });
}

/**
 * Function handle payment
 */
export async function apiPayment(req, res){
    const user = await tryGetUser(req, res);
    if (user === null) {
        return;
    }
    const products = await getProductsInBasket(user);

    if(products === undefined || products === null)
    {
        res.status(404).send('Payment error');
        return;
    }
    
    let cost = 0;
    products.forEach(product => {
        if (product !== null) {
            cost += product.price
        }
    });

    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: products.map(product => {
                return {
                    price_data: {
                      currency: "usd",
                      product_data: {
                        name: product.name,
                      },
                      unit_amount: product.price * 100,
                    },
                    quantity: 1,
                  }
          }),
          // TODO: To trzeba zmienić z localhosta na coś bardziej uniwersalnego
          success_url: `http://localhost:3000/checkout?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://localhost:3000/`,
        })
        res.redirect(session.url);

      } catch (e) {
        res.status(404).send('Payment error');
      }
}

export async function successPayment(req, res){
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    //for security reasons
    if(session.payment_status === 'paid') {
        const user = await tryGetUser(req, res, 'Payment error', 404);
        if (!user) {
            return;
        }

        const productsInBasket = await getProductsInBasket(user);
        if (productsInBasket.length === 0) {
            res.status(404).send('Payment error');
            return;
        }

        await createNewOrder(user, productsInBasket);
        await clearBasket(user);

        res.render('user/bought');
    }
    else{
        res.status(404).send('Payment error');
    }
    
}