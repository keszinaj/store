import {getProductsByName} from "../dbUtils/dbQueries";

export async function getSearchResult(req, res){
    const isLoggedIn = req.session.logged === true;
    const searchQuery = req.query.search;
    const products = await getProductsByName(searchQuery);
    res.render('user/search_page', { products: products, logged: isLoggedIn });
}