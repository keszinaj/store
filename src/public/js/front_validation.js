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
const password = document.getElementById("password");
const password_repeat = document.getElementById("password_repeat");
const formerror = document.getElementById("formerror");
const main = document.getElementById("main");

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
    let psw = password.value;
    let pswr = password_repeat.value;
    if (psw !== pswr) {
        return ('Passwords differ')
    } else if (psw.length < 6) {
        return ('Password is too short. Min. 6 chars.')
    } else if (psw.length > 50) {
        return ('Password is too long. Max. 50 chars.')
    } else if (/\d/.test(psw) === false) {
        return ('Password must have a number.')
    } else if (/(.*[A-Z].*)/.test(psw) === false || /(.*[a-z].*)/.test(psw) === false) {
        return ('Password must have an uppercase and lowercase letter.')
    } else if (/(?=.*\W)/.test(psw) === false) {
        return ('Passwords must have one special character')
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
        main.innerHTML = `
  <div class="container d-flex align-items-center justify-content-center my-5 py-5">
      <div class="rounded border border-success text-center p-5 m-5">
          <h2>Successful registrations.</h2><br> Click "Login" to log in or "Store" to return to the store.
          <br>
          <a href="/">
            <button type="button" class="btn btn-outline-primary m-3">Store</button>
          </a>
          <a href="/login">
            <button type="button" class="btn btn-outline-success m-3">Login</button>
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
        postFormDataAsJson('/register', data);
    }
});