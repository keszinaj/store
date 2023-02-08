export function getProductDetails(req, res)
{
  //let id:string = req.params.id;
  if(req.session.logged === true)
  {
    res.render('user/oneitem', {logged: true});
  }
  else{
    //for example purpose
    res.render('user/oneitem');

  }
}