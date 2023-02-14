//potem to trzeba będzei połączyc z landing_page_script z innego PR !!!!
const items_view = document.getElementById("items");
const btn_next = document.getElementById("next");
const btn_prev = document.getElementById("prev");
const info = document.getElementById('frontinfo');
//global scope
let allIDs = [] //list of all available item
let ip = 0; //first item on list
let ni = 3; //number of items per page


async function downloadAllIDs(){
    const response = await fetch('/allproducts');
    const data = await response.json();
    return data.ids;
}

async function downloadInfoData(tab){
    let url = '/ppinfo/' + JSON.stringify(tab.join("_"))
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
function setBuyButton(){
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
                info.innerHTML = `<div class="alert alert-success text-center mx-5 my-5" role="alert">
            Item added to cart!
            </div>`
            }
            else{
                info.innerHTML = `<div class="alert alert-danger text-center mx-5 my-5" role="alert">
                Please login.
                </div>`
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch(err) {
            console.log(err);
          }
    })
  })

}
function setButtons(){
    if(ip > 0 && btn_prev.classList.contains("disabled"))
    {
        btn_prev.classList.remove("disabled")
    }
    else if(ip === 0 && !btn_prev.classList.contains("disabled"))
    {
        btn_prev.classList.add("disabled")
    }
    if(allIDs.length > ip + ni && btn_next.classList.contains("disabled"))
    {
        btn_next.classList.remove("disabled")
    }
    else if(allIDs.length <= ip + ni && !btn_next.classList.contains("disabled"))
    {
        btn_next.classList.add("disabled")
    }
    setBuyButton()
}


function printProducts(data){
    let html_view = data.map(e=>{
        return `
        <div class="card card--style">
        <img src="./laptop_img/${e.photoPath}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><a href="/product/${e.id}" class="text-dark">${e.name} </a></h5>
          <ul class="text-muted p-0" style="list-style-type: none; font-size: 0.8rem;">
            <li>
              CPU: ${e.cpu}
            </li>
            <li>
              Memory: ${e.memory}
            </li>
            <li>
              Graphics: ${e.graphics}
            </li>
            <li>
          </ul>
          <div class="d-flex justify-content-between align-items-center px-3">
            <div>
            ${e.price} $
            </div>
            <button type="button" class="btn btn-outline-success w-50 buy"  value="${e.id}"> Buy </button>
          </div>
        </div>
      </div>
        `
    })
    items_view.innerHTML= html_view;
    setButtons();
}

async function downloadAndPrintData(){
    let takeInfo = allIDs.slice(ip, ip+ni);
    let infoData = await downloadInfoData(takeInfo)
    printProducts(infoData.prod)
}

/**
 * 1. Download ids of all available products
 * 2. Download partial data of "ni" firs product
 * 3. Print data
 */
window.onload = async function() {
    allIDs = await downloadAllIDs();
    await downloadAndPrintData()
  };



/**
 * Handle buttons for paging.  
 */
btn_next.addEventListener('click', async e => {
    e.preventDefault();
    ip += ni;
    await downloadAndPrintData();
})

 btn_prev.addEventListener('click', async e => {
    e.preventDefault();
    ip -= ni;
    await downloadAndPrintData();
})