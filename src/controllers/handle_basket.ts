import { getUserbyId, getProductbyID, pushNewOrder, getAllOrders, getAllUsers, addOrderToUser } from '../models/repo_demo';
const stripe = require('stripe')("sk_test_51Mae79DsMkUfjELNFGqTadfXlVJo48xS4ekh0R1FhdngnYb1HGdL3xlDWQsK6TK3IxwpX8yPR7v2aVwupj8CnzjC00C5uwJki6")

export async function apiPayment(req, res){
    let user_basket = getUserbyId((<any>req).user)?.Basket;
    let items = user_basket?.map(id => getProductbyID(id))

    if(items === undefined || items === null)
    {
        res.status(404).send('Payment error');
        console.log(items)
        return;
    }
    
    let cost = 0
    items.forEach(e=> {if(e!==null){cost = cost + e.Price}})

    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: items.map(item => {
                return {
                    price_data: {
                      currency: "usd",
                      product_data: {
                        name: item?.Name,
                      },
                      unit_amount: (<any>item).Price * 100,
                    },
                    quantity: 1,
                  }
          }),
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
    if(session.payment_status === 'paid')
    {
        let user = getUserbyId((<any>req).user);
        if(user === null){res.status(404).send('Payment error'); return;}
        let user_basket = user.Basket;
        user.Basket = [];
        if(user_basket === undefined){res.status(404).send('Payment error'); return;}
        let id =  Math.floor(Math.random() * 100000)
        let order = {
            ID: id,
            UserID: parseInt((<any>req).user),
            ProductIDs: user_basket,
            OrderPlacementDate: new Date(),
            Status: 0
        }
        pushNewOrder(order)
        addOrderToUser(id, user.ID)
        console.log(getAllOrders());
        console.log(getAllUsers())

        res.render('user/bought');
    }
    else{
        res.status(404).send('Payment error');
    }
    
}