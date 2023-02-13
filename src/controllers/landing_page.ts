import {getAllProductsIDs, getUserbyId, getProductbyID} from '../models/repo_demo';


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
      p.Basket.push(pid)
    }
  }
  res.status(200).json({ errors: ""}); 
}

export function sendAllProductsIDs(req, res){
  let allids: Number[]= [];
  allids = getAllProductsIDs()
  res.status(200).json({ids: allids})
}

export function sendProductsPartilaInfo(req, res){
  let tab_of_ids = JSON.parse(req.params.arg).split("_")
  let tab_of_pd: {}[] = []
  tab_of_ids.forEach(e=> {
    let i = parseInt(e);
    let p = getProductbyID(i)
    let pd = {}
    if( p !== null)
    {
      for (const [key, value] of Object.entries(p)) {
        if(key !== 'Details')
        {
          pd[key] = value;
        }
      }
      tab_of_pd.push(pd)
    }

  })
  res.status(200).json({prod: tab_of_pd})

}