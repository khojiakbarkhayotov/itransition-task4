"use strict";

// Elements
const inputPassword = document.querySelector(".password-input");
const inputEmail = document.querySelector(".email-input");
const login = document.querySelector(".btn-login");
const form = document.querySelector(".login100-form");
const errorMsg = document.querySelector(".error-msg");
const errorMsgDiv = errorMsg.closest("div");

// Functionality of the form
inputEmail.focus();

const clear = function () {
  inputEmail.value = "";
  inputPassword.value = "";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = inputEmail.value;
  const password = inputPassword.value;
  // validate input
  if (!validate(email) || !validate(password, "")) {
    showValidate(inputEmail);
    showValidate(inputPassword);
  }
  const users = JSON.parse(localStorage.getItem("users"));
  // console.log(users);
  if(!users) users = [];
  let res = "fail";
  users.forEach((user) => {
    if (user?.email === email && user?.password === password) {
      if (user.status) {
        user.lastTime = new Date().toLocaleString();
        user.currentUser = true;
        localStorage.setItem("users", JSON.stringify(users));
        window.location = "../main.html";
      } else {
        res = "";
        errorMsg.textContent = "You has been blocked! Re-register again ;)";
        errorMsgDiv.classList.remove("hidden");
      }
      // res = "fail";
    } else {
      res = "fail";
    }
  });

  // if login is not successful
  if (res === "fail") {
    errorMsg.textContent = "Incorrect password or email! Please try again ;)";
    errorMsgDiv.classList.remove("hidden");
  }
  clear();
});

// hiding errors
[inputEmail, inputPassword].forEach((el) =>
  el.addEventListener("focus", function () {
    hideValidate(this);
    errorMsgDiv.classList.add("hidden");
  })
);

// validate input data
function validate(input, type = "mail") {
  if (type === "email") {
    if (
      input
        .trim()
        .match(
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
        ) == null
    ) {
      return false;
    }
  } else {
    if (input.trim() == "") {
      return false;
    }
  }
  return true;
}

function showValidate(input) {
  const thisAlert = input.closest("div");

  thisAlert.classList.add("alert-validate");
}

function hideValidate(input) {
  var thisAlert = input.closest("div");

  thisAlert.classList.remove("alert-validate");
}
