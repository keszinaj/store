const argon2 = require('argon2');
const {validationResult } = require('express-validator');
import { getUserbyId, editUser, changePassword, getOrdersbyUserID} from '../models/repo_demo';
/**
 * Function return profile settings view
 */
export function getProfileSettings(req, res){
    let id= (req as any).user;
    id = parseInt(id);
    if(isNaN(id)) { res.status(400).send('Server side error'); return;}

    let user = getUserbyId(id);
    if(user === null){ res.status(400).send('Server side error'); return;}
    
    res.render('user/account_settings', { user: user });
}

/**
 * Function change user data
 */
function bindData(data, old_user){
    let bd = new Date(data.birthdayDate)
    let gender = parseInt(data.gender)
    let user = 
    {
        ID: 1,
        Name: data.firstName,
        Surname: data.lastName,
        Email: data.emailAddress,
        Password_Hash: old_user.Password_Hash, //tojesthaslo
        Phone_number: data.phoneNumber,
        Birthday: bd,
        Gender: gender,
        Country: data.country,
        City: data.city,
        Street: data.street_and_num,
        Postal_Code: data.zipcode,
        OrderIDs: old_user.OrderIDs,
        Basket: old_user.Basket
    }
    
    editUser(user);
}

/**
 * Handle POST request
 */
export function changeAccountData(req, res){
    let id= (req as any).user;
    id = parseInt(id);
    if(isNaN(id)) { res.status(400).send('Server side error'); return;}
    let user = getUserbyId(id);
    if(user === null){ res.status(400).send('Server side error'); return;}
    let errors = validationResult(req);
    
    errors.errors = errors.errors.filter(e => e.msg !== 'E-mail already in use')
  
    if (errors.isEmpty()) {
        bindData(req.body, user);
      }

    res.status(201).json({ errors: errors.errors});

}

/**
 * Function change user password
 */
export async function changePsw(req, res)
{
    let id= (req as any).user;
    id = parseInt(id);
    if(isNaN(id)) { res.status(400).send('Server side error'); return;}

    let user = getUserbyId(id);
    if(user === null){ res.status(400).send('Server side error'); return;}
    let errors = validationResult(req);

    if (errors.isEmpty()) {
        let h_psw = user.Password_Hash
        let psw_input = req.body.old_psw
        if (await argon2.verify(h_psw, psw_input)) {
            let p = await argon2.hash(req.body.password)
            changePassword(id, p);
        }
        else{
            res.status(201).json({ errors: [{msg: "Wrong password"}]});
            return;
        }
    }
    res.status(201).json({ errors: errors.errors});

}

/**
 * Function render user history
 *
*/
export function renderUserHistory(req, res){
    let id= (req as any).user;
    id = parseInt(id);
    if(isNaN(id)) { res.status(400).send('Server side error'); return;}

    let user = getUserbyId(id);
    if(user === null){ res.status(400).send('Server side error'); return;}
    const orders = getOrdersbyUserID(id);
    const ordersWithTotalPrice = orders.map(order => {
        const totalPrice = order.Products.reduce((total, product) => {
            return total + product!.Price;
        }, 0);
        return { ...order, totalPrice: totalPrice };
    });
    res.render('user/account_history', { orders: ordersWithTotalPrice });
}