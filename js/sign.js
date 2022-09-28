"use strict";

// Elements
const form = document.querySelector(".input-form");
const inputName = document.querySelector(".name");
const inputEmail = document.querySelector(".email");
const inputPassword = document.querySelector(".pass1");
const confirmPassword = document.querySelector(".pass2");
const errorMsg = document.querySelector(".error-msg");
const errorMsgDiv = errorMsg.closest("div");

let user;
let users = JSON.parse(localStorage.getItem("users"));
if (!users || users.length < 1) users = [];

// functionality
inputName.focus();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = inputName.value;
  const email = inputEmail.value;
  const pass1 = inputPassword.value;
  const pass2 = confirmPassword.value;
  console.log(name, email, pass1, pass2);
  if (
    !validate(name, "name") ||
    !validate(email, "email") ||
    !validate(pass1, "", pass2)
  ) {
    errorMsg.textContent = "Incorrect data received! Please try again ;)";
    errorMsgDiv.classList.remove("hidden");
  } else {
    const data = createUser(name, email, pass1);
    user.currentUser = true;
    localStorage.setItem("users", JSON.stringify(users));
    window.location = "../main.html";
  }
});

[inputName, inputEmail, inputPassword].forEach((el) =>
  el.addEventListener("focus", function (e) {
    errorMsgDiv.classList.add("hidden");
  })
);

function validate(inputA, type, inputB = "") {
  if (type == "name") {
    if (inputA.length < 3) {
      console.log("name");
      return false;
    }
  } else if (type == "email") {
    if (
      inputA
        .trim()
        .match(
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
        ) == null
    )
      return false;
  } else {
    if (inputA !== inputB || inputB === "") {
      {
        console.log("name");
        return false;
      }
    }
  }
  return true;
}

function createUser(name, email, password) {
  const date = new Date().toLocaleString();

  user = {
    id: Date.now().toString().slice(7),
    name,
    email,
    password,
    lastTime: date,
    regTime: date,
    status: true,
    currentUser: false,
  };

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
}
