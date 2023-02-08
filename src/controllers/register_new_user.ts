const {validationResult } = require('express-validator');
const argon2 = require('argon2');
import {pushNewUser} from '../models/repo_demo' 

//creating new user and addding to DB
async function register_user(data)
{
    console.log(data);
    const psw = await argon2.hash(data.password);
    let id = Math.floor(Math.random() * 1000000) //to TRZEBA pewnie zmeinic na cos lepszego
    let bd = new Date(data.birthdayDate)
    let gender = data.gender
    let new_user = {
        ID: id,
        Name: data.firstName,
        Surname: data.lastName,
        Email: data.emailAddress,
        Password_Hash: psw,
        Phone_number: data.phoneNumber,
        Birthday: bd,
        Gender: gender,
        Country: data.country,
        City: data.city,
        Street: data.street_and_num,
        Postal_Code: data.zipcode,
        OrderIDs: []
    }
    pushNewUser(new_user);


}
function register(req, res){
    //validation
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        register_user(req.body);
      }
    res.status(201).json({ errors: errors.array() }); //201 abysmy nie
}





export default register;