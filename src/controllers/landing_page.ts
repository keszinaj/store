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
}

export async function sendProductsPartialInfo(req, res){
  let idsArr: number[] = JSON.parse(req.params.arg).split("_");
  let products = await Promise.all(
      idsArr.map(async id => await getProductById(id))
  );

  // console.log(products);

  let partialInfoArr: {}[] = [];
  products.forEach( product => {
    if( product !== null) {
      let productPartialInfo = product.getPartialInfo();
      partialInfoArr.push(productPartialInfo);
    }
  });

  console.log(partialInfoArr);

  res.status(200).json({prod: partialInfoArr})
}