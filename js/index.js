const signIn = document.querySelector("#signIn");
const signUp = document.querySelector("#signUp");
const logOut = document.querySelector("#logOut");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid);
    if (uid) {
      signIn.style.display = "none";
      signUp.style.display = "none";
    }
  } else {
    logOut.style.display = "none";
  }
});

logOut.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      signIn.style.display = "block";
      signUp.style.display = "block";
      logOut.style.display = "none";
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
});
