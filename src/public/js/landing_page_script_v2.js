//potem to trzeba będzei połączyc z landing_page_script z innego PR
const items_view = document.getElementById("items");

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
function printProducts(data){
    let html_view = data.map(e=>{
        return `
        <div class="card card--style">
        <img src="./laptop_ex.webp" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><a href="/product/id=${e.ID}" class="text-dark">${e.Name} </a></h5>
          <ul class="text-muted p-0" style="list-style-type: none; font-size: 0.8rem;">
            <li>
              CPU: ${e.CPU}
            </li>
            <li>
              Memory: ${e.Memory}
            </li>
            <li>
              Graphics: ${e.Graphics}
            </li>
            <li>
          </ul>
          <div class="d-flex justify-content-between align-items-center px-3">
            <div>
            ${e.Price} $
            </div>
            <button type="button" class="btn btn-outline-success w-50"  value="${e.ID}"> Buy </button>
          </div>
        </div>
      </div>
        `
    })
    items_view.innerHTML= html_view;

}
window.onload = async function() {
    let ip = 0;
    let ik = 3;
    let allIDs = await downloadAllIDs();
    console.log(allIDs)
    const amountOfIds = allIDs.length
    let takeInfo = allIDs.slice(ip, ik);
    let infoData = await downloadInfoData(takeInfo)
    console.log(infoData)
    printProducts(infoData.prod)
  };

