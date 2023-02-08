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