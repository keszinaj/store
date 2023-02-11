/**
 * Script that allows the search string remain in the input
 */
const search_input = document.getElementById("searchinput");
window.addEventListener("load",function(event) {
    let pom = window.location;
    if(pom.pathname === "/search")
    {
        let search = pom.search.replace('?search=', '')
        search = search.replace('+', ' ')
        search_input.value = search;  
    }
},false);
