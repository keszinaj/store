import {getUserbyId} from '../models/repo_demo'

export function getLandingPage(req, res)
{
  if(req.session.logged === true)
  {
    res.render('user/landing_page', {logged: true});
  }
  else{
    res.render('user/landing_page');

  }
}


export function addToCart(req, res){
    
  let pid = parseInt(req.body.id)
  let amount = parseInt(req.body.amount)
  let uid = req.session.uid
  let p = getUserbyId(uid);
  if(p !== null)
  {
    for (let i = 0; i < amount; i++) {
      p.basket.push(pid)
    }
  }
  console.log(p)
  console.log(typeof req.session.uid)
  res.status(200).json({ errors: ""}); 
}