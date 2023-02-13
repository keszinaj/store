import {getAllProducts, getProductById} from "../dbUtils/dbQueries";

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

export async function sendAllProductsIDs(req, res){
  let allIds: Number[];
  let products = await getAllProducts();
  allIds = products.map(prod => prod.id);
  res.status(200).json({ids: allIds});


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

export async function sendProductsPartialInfo(req, res){
  let idsArr: number[] = JSON.parse(req.params.arg).split("_");
  let products = await Promise.all(
      idsArr.map(async id => await getProductById(id))
  );

  let partialInfoArr: {}[] = [];
  products.forEach( product => {
    if( product !== null) {
      let productPartialInfo = product.getPartialInfo();
      partialInfoArr.push(productPartialInfo);
    }
  });

  res.status(200).json({prod: partialInfoArr})
}