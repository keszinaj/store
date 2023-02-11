import {getUserByEmail} from "../dbUtils/dbQueries";

const argon2 = require('argon2');

export function getLogin(req, res)
{
  if(req.session.logged === true)
  {
    res.render('user/landing_page', {logged: true})
  }
  else{
    res.render('user/login')

  }
  
  
}
export async function loginUser(req, res){
    //check if email is valid
    let email = req.body.login;
    var re = /\S+@\S+\.\S+/;

    if(re.test(email))
    {
        let user = await getUserByEmail(email)
        if(user !== null)
        {
            let psw_input = req.body.password; 
            let h_psw = user.passwordHash;
            
            if (await argon2.verify(h_psw, psw_input)) {
                //setting logged user data
                (req as any).session.logged = true; 
                (req as any).session.uid = user.id;

                res.render('user/landing_page', {top_message: `<div class="alert alert-success text-center mx-5 my-2" role="alert">
                Correct login. Welcome!
              </div>`, logged: true});
              } 
            else{
                res.render('user/login', { error_message: "Wrong password" });
            }
        }
        else{
            res.render('user/login', { error_message: "User doesn't exist" });
        }
    }
    else{
        res.render('user/login', { error_message: "Bad mail" });
    }
}

export function logoutUser(req, res)
{
    req.session.destroy()
    res.redirect('/')
}