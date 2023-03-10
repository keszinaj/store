import {getProductById} from "../dbUtils/dbQueries";

export async function getProductDetails(req, res)
{
  let id: string = req.params.id;
    const productID = parseInt(id);
    if (isNaN(productID)) {
        res.status(400).send('Invalid product ID');
        return;
    }
    const product = await getProductById(productID);
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }

  if(req.session.logged === true)
  {
    res.render('user/oneitem', {logged: true, product: product});
  }
  else{
    res.render('user/oneitem', {product: product});
  }
}