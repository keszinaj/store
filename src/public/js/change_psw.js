const submit_bt = document.getElementById("submit_btn");
const old_password = document.getElementById("oldpassword1")
const password_new = document.getElementById("newpassword1");
const password_repeat = document.getElementById("newpassword2");
const formerror = document.getElementById("formerror");
const main = document.getElementById("content");

function createRequestData() {
    let data =
    {
        old_psw: old_password.value,
        password: password_new.value 
    }
    console.log(data)
    return data;
}

function validate() {
    let psw = password_new.value;
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
          <h2>Successful registrations.</h2><br> Click "Store" to return to the store.
          <br>
          <a href="/">
            <button type="button" class="btn btn-outline-primary m-3">Store</button>
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
        postFormDataAsJson('/account/changepassword', data);
    }
});