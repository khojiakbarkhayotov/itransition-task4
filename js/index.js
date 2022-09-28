"use strict";

// select elements
const block = document.querySelector(".block-user");
const unblock = document.querySelector(".unblock-user");
const deleteUser = document.querySelector(".delete-user");
const logout = document.querySelector(".logout");
const parentEl = document.querySelector(".parent-body");
const checkBoxMain = document.querySelector(".main-check");
const users = JSON.parse(localStorage.getItem("users"));
let userList;
let current;

// functionality

function generateMarkup(user, i) {
  const status = user.status;
  const markup = `
  <tr>
  <th scope="row">
      <div class="form-check">
          <input
              class="form-check-input check-ord"
              type="checkbox"
              value="${user.id}"
              id="flexCheckDefault"
          />
      </div>
  </th>
  <td>${i}</td>
  <td>${user.name}</td>
  <td>${user.email}</td>
  <td>${user.id}</td>
  <td>${user.lastTime}</td>
  <td>${user.regTime}</td>
  <td class="text-${status ? "success" : "danger"}">${
    status ? "active" : "blocked"
  }</td>
  <tr>
  `;
  return markup;
}

function insert(user, i) {
  parentEl.insertAdjacentHTML("beforeend", generateMarkup(user, i));
}

function clearContent() {
  parentEl.querySelectorAll(".check-ord").forEach((child) => {
    child.remove();
  });
}

function load() {
  users.forEach((user, index) => {
    insert(user, index + 1);
  });
}

load();

userList = document.querySelectorAll(".check-ord");

checkBoxMain.addEventListener("click", function () {
  if (this.checked) {
    userList.forEach((el) => {
      el.checked = true;
    });
  } else {
    userList.forEach((el) => {
      el.checked = false;
    });
  }
});

function handleBlock(status) {
  // console.log(typeof status);
  const list = [...userList].filter((node) => node.checked === true);
  list.forEach((el) => {
    const value = el.getAttribute("value");
    users.forEach((user, index) => {
      if (user.id === value) {
        current = Object.assign({}, user);
        if (typeof status != "object") {
          user.status = status;
          if (!status) user.currentUser = false;
        } else {
          users.splice(index, 1);
          user.currentUser = false;
        }
        localStorage.setItem("users", JSON.stringify(users));
      }
    });
  });

  if (current.currentUser == true) {
    // console.log("bankai");
    window.location = "../index.html";
  }
  // reload page
  else location.reload();
}

block.addEventListener("click", handleBlock.bind(this, false));

unblock.addEventListener("click", handleBlock.bind(this, true));

deleteUser.addEventListener("click", handleBlock);

logout.addEventListener("click", function () {
  users.forEach((user) => (user.currentUser = false));
  localStorage.setItem("users", JSON.stringify(users));
  window.location = "../index.html";
});

// users.splice(index, 1);
