const submit_bt = document.getElementById("submit_btn");
const fname = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const mail = document.getElementById("emailAddress");
const phone = document.getElementById("phoneNumber");
const birthday = document.getElementById("birthdayDate");
const street_and_num = document.getElementById("street_and_num");
const city = document.getElementById("city");
const zip = document.getElementById("zipcode");
const country = document.getElementById("country");
const formerror = document.getElementById("formerror");
const whbody = document.getElementById("body-set");

function createRequestData() {
    let data = Array.from(document.querySelectorAll('#firstName, #lastName, #emailAddress, #password, #phoneNumber, #birthdayDate, #city, #zipcode, #street_and_num, #country'))
    data = data.reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {})
    if (document.getElementById('femaleGender').checked) { data["gender"] = 0 }
    else if (document.getElementById('maleGender').checked) { data["gender"] = 1 }
    else { data["gender"] = 2 }
    return data;
}

function validate() {
    if (fname.value === '' || fname.value.length > 500) {
        fname.value = '';
        return ("Real name is required");
    }
    else if (lastName.value === '' || fname.value.length > 500) {
        lastName.value = '';
        return ("Real surname is required");
    }
    else if (mail.value === '' || /\S+@\S+\.\S+/.test(mail.value) === false) {
        mail.value = '';
        return ("Real email is required");
    }
    else if (phone.value === '') {
        phone.value = '';
        return ("Real phone number is required");
    }
    else if (birthday.value === '') {
        return ("Birthday is required");
    }
    else if (street_and_num.value === '') {
        return ("Street and number is required");
    }
    else if (city.value === '') {
        return ("City is required");
    }
    else if (zip.value === '') {
        return ("Zip Code is required");
    }
    else if (country.value === '') {
        return ("Country is required");
    }
    return "OK";
}
async function postFormDataAsJson(url, formData) {

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
        whbody.innerHTML = `
  <div class="container d-flex align-items-center justify-content-center my-5 py-5">
      <div class="rounded border border-success text-center p-5 m-5">
          <h2>Successful change data.</h2><br> Click "Profile settings" to return to the profile settings.
          <br>
          <a href="/account">
            <button type="button" class="btn btn-outline-primary m-3">Profile settings</button>
          </a>
          </div>
  </div>
  `
    }
    else {
        let msg = '';
        jsresponse.errors.forEach(er => msg = msg + er.msg + " <br> ");
        formerror.innerHTML = msg
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
        formerror.innerHTML = `Sending data`
        data = createRequestData()
        postFormDataAsJson('/account', data);
    }
});