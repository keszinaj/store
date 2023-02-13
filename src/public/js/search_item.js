const infom = document.getElementById('frontinfo');

document.querySelectorAll('.buy').forEach(item => {
    item.addEventListener('click', async e => {
        e.preventDefault();
        try { 
            const formDataJsonString = JSON.stringify({amount: "1", id: item.value});    
            const response = await fetch('/addtobasket', {
                method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: formDataJsonString,
            });
            const contentType = response.headers.get("content-type");
            //check if post pass authorize
            if (contentType && contentType.indexOf("application/json") !== -1){
                infom.innerHTML = `<div class="alert alert-success text-center mx-5 my-5" role="alert">
            Item added to cart!
            </div>`
            }
            else{
                infom.innerHTML = `<div class="alert alert-danger text-center mx-5 my-5" role="alert">
                Please login.
                </div>`
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch(err) {
            console.log(err);
          }
    })
  })

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
