const submit_bt = document.getElementById("submit-btn");
const pname = document.getElementById("name");
const cpu = document.getElementById("cpu");
const memory = document.getElementById("memory");
const graphics = document.getElementById("graphics");
const details = document.getElementById("details");
const price = document.getElementById("price");
const available = document.getElementById("available");
const formerror = document.getElementById("formerror");
const photo = document.getElementById("file");
const main = document.getElementById("main");
//get product ID from url path
const productID = window.location.pathname.split("/")[4];

// TODO: Dodać obsluge zdjec

function validate() {
  if (pname.value === '' || pname.value.length > 500) {
    pname.value = '';
    return ("Real name is required");
  }
  if (cpu.value === '' || cpu.value.length > 500) {
    cpu.value = '';
    return ("Correct cpu is required");
  }
  if (memory.value === '' || /\d+(gb|Gb|GB)?/.test(memory.value) === false) {
    memory.value = '';
    return ("Correct memory is required");
  }
  if (graphics.value === '' || graphics.value.length > 500) {
    graphics.value = '';
    return ("Correct graphics is required");
  }
  if (price.value === '' || price.value.length > 500 || isNaN(price.value) === true) {
    price.value = '';
    return ("Correct price is required");
  }

  if (available.value === '' || available.value.length > 500 || isNaN(available.value) === true) {
    available.value = '';
    return ("Correct amount is required");
  }

  if (details.value.length > 10000) {
    details.value = '';
    return ("Details are too long");
  }

  return "OK";
}
async function postFormDataAsJson(url, formData, file) {

  const formDataJsonString = JSON.stringify(formData);

  const fetchOptions = {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json'
    },

    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);
  let jsresponse = await response.json()
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  if (jsresponse.errors.length === 0) {
    if (file) {
      const form = new FormData();
      form.append('file', file)
      const response = await fetch('/admin/products/new_photo', {
        method: 'POST',
        body: form
      });
    }
    formerror.innerHTML = "Edit successful";
    formerror.classList = [];
    formerror.classList.add("alert-success", "alert", "text-center");
  }
  else {
    let msg = '';
    jsresponse.errors.forEach(er => msg = msg + er.msg + " <br> ");
    formerror.innerHTML = msg;
    formerror.classList = [];
    formerror.classList.add("alert-danger", "alert", "text-center");
  }

}


submit_bt.addEventListener("click", function (e) {
  e.preventDefault();
  let validate_error = validate();
  window.scrollTo({ top: 0, behavior: 'smooth' })
  if (validate_error !== "OK") {
    formerror.innerHTML = validate_error
    formerror.classList.add("alert-danger", "alert", "text-center");
  }
  else {
    formerror.innerHTML = `Sending data`;
    formerror.classList = [];
    formerror.classList.add("alert-info", "alert", "text-center");
    let data = Array.from(document.querySelectorAll('#name, #cpu, #memory, #graphics, #price, #available, #details, #file'))
    data = data.reduce((acc, input) => ({ ...acc, [input.id]: input.value }), { productID: parseInt(productID) });
    const file = document.getElementById('file').files[0];
    postFormDataAsJson('/admin/products/edit/' + productID, data, file);
  }
});