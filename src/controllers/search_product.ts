import {serchByName} from '../models/repo_demo';

export async function getSearchResult(req, res){
    let l = req.session.logged === true;
    const s = req.query.search;
    let products = serchByName(s);
    res.render('user/search_page', { products: products, logged: l });

}