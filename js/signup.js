const eye = document.querySelectorAll("#togglePassword");
eye.forEach((password) => {
  password.addEventListener("click", () => {
    const input = password.previousElementSibling;
    if (password.className.includes("fa-eye-slash")) {
      input.type = "password";
      password.className = "fa-regular fa-eye toggle-password";
    } else {
      input.type = "text";
      password.className = "fa-regular fa-eye-slash toggle-password ";
    }
  });
});
const accountSubmit = document.querySelector(".account-submit");
const inpEmail = document.querySelector("#email");
const inpPassword = document.querySelector("#password");
const inpCFPassword = document.querySelector("#cf-password");
const showError = document.querySelector(".show-error");
const btnregister = document.querySelector(".btn-submit");
const loader = document.querySelector(".loader");
const showSuccess = document.querySelector(".show-success");
accountSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const email = inpEmail.value;
  const password = inpPassword.value;
  const CFPassword = inpCFPassword.value;
  if (password == CFPassword) {
    loader.style.display = "inline-block";
    btnregister.style.display = "none";
    accountSubmit.classList.add("loading");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            email: email,
            created_date: new Date().toString(), //xem giờ đăng kí
            updated_date: null, // kiểm tra giờ đăng nhập
          });

        showSuccess.style.visibility = "visible";
        setTimeout(() => {
          showSuccess.style.visibility = "hidden";
        }, 5000);

        // ...
      })
      .catch((error) => {
        loader.style.display = "none";
        btnregister.style.display = "block";
        accountSubmit.classList.remove("loading");
        var errorCode = error.code;
        var errorMessage = error.message;
        showError.textContent = errorMessage;
        console.log(errorMessage);
        showError.style.visibility = "visible";
        setTimeout(() => {
          showError.style.visibility = "hidden";
        }, 5000);
        // ..
      })
      .finally(() => {
        loader.style.display = "none";
        btnregister.style.display = "block";
        accountSubmit.classList.remove("loading");
      });
  }
});
