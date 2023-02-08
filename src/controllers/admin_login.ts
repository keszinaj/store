const argon2 = require('argon2');
import {get_admin} from '../models/repo_demo';


export async function login_user(req, res){
    //check if email is valid
    let login = req.body.login;
    let psw = req.body.password; 
    let admin_credential = get_admin();
    if(await argon2.verify(admin_credential.password, psw) && login === admin_credential.login)
    {
        req.session.admin=true;
        res.redirect('/admin')
    }
    else{
        res.render('admin/admin_login', { error_message: "Wrong password" });
    }
    
}

export function logout_admin(req, res)
{
    req.session.destroy(function(err) {
        console.log("Wylogowano");
        // cannot access session here
      })
        res.redirect('/')
}
