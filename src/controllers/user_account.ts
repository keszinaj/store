import {changeUserPassword, getOrdersOfUser, saveUser} from "../dbUtils/dbQueries";
import {Order} from "../models/order.model";
import {tryGetUser} from "./utils";

const argon2 = require('argon2');
const {validationResult } = require('express-validator');

/**
 * Function return profile settings view
 */
export async function getProfileSettings(req, res){
    const user = await tryGetUser(req, res);

    if (user) {
        res.render('user/account_settings', {user: user});
    }
}

/**
 * Function change user data
 */
async function bindData(data, user){
    user.name = data.firstName;
    user.surname = data.lastName;
    user.email = data.emailAddress;
    user.phoneNumber = data.phoneNumber;
    user.birthday = data.birthdayDate;
    user.gender = parseInt(data.gender);
    user.country = data.country;
    user.city = data.city;
    user.street = data.street_and_num;
    user.postalCode = data.zipcode;

    await saveUser(user);
}

/**
 * Handle POST request
 */
export async function changeAccountData(req, res){
    const user = await tryGetUser(req, res);
    if (!user) {
        return;
    }

    let errors = validationResult(req);
    errors.errors = errors.errors.filter(e => e.msg !== 'E-mail already in use')
    if (errors.isEmpty()) {
        await bindData(req.body, user);
    }

    res.status(201).json({ errors: errors.errors});
}

/**
 * Function change user password
 */
export async function changePsw(req, res)
{
    const user = await tryGetUser(req, res);
    if (!user) {
        return;
    }

    let errors = validationResult(req);
    if (errors.isEmpty()) {
        let oldPasswordHash = user.passwordHash;
        let oldPasswordPlain = req.body.old_psw;
        if (await argon2.verify(oldPasswordHash, oldPasswordPlain)) {
            let newPasswordHash = await argon2.hash(req.body.password);
            await changeUserPassword(user, newPasswordHash);
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
*/
export async function renderUserHistory(req, res){
    const user = await tryGetUser(req, res);
    if (!user) {
        return;
    }
    const orders = await getOrdersOfUser(user);
    const ordersWithTotalPrice = await Order.getOrdersWithTotalPrice(orders);

    res.render('user/account_history', { orders: ordersWithTotalPrice });
}