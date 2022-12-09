//select all elements
const createAccountBtn = document.querySelector(".button__container button");
const usernameInput = document.querySelector("input#username");
const emailInput = document.querySelector("input#email");
const passwordInput = document.querySelector("input#password");
const confirmPasswordInput = document.querySelector("input#confirmPassword");
const form = document.querySelector("form");
const apiEndPoint = "https://goldblv.com/api/hiring/tasks/register";
//! set Error Function
const showError = (element, message) => {
  const formControl = element.parentElement.parentElement;
  const small = formControl.querySelector(".error");
  small.textContent = message;
};
//! set success Function
const success = (element) => {
  const formControl = element.parentElement.parentElement;
  const small = formControl.querySelector(".error");
  small.textContent = "";
};

// ! validate username , username => Username must consist of 5 to 15 characters, only letters and numbers are allowed, with no numbers at the beginning or the end

const validateUsername = (username) => {
  const pattern = /^[a-z][a-z0-9]*([a-z]+)$/gi;
  const valid = pattern.test(username);
  if (
    valid &&
    username.length >= 5 &&
    username.length <= 15 &&
    username.trim() !== ""
  ) {
    success(usernameInput);
    return true;
  } else if (!valid) {
    showError(
      usernameInput,
      "Username must consist of 5 to 15 characters, only letters and numbers are allowed, with no numbers at the beginning or the end"
    );
  } else if (username.trim() === "") {
    showError(usernameInput, "Username mustn't be blank");
  } else if (username.length < 5) {
    showError(usernameInput, "Username is too short should between 5-15");
  } else if (username.length > 15) {
    showError(usernameInput, "Username is too long should between 5-15");
  }
  return false;
};

//! Validate Email
const validateEmail = (email) => {
  const regex = /^[a-z]+\d+@[a-z]+\.[a-z]{2,3}/;
  const valid = regex.test(email);
  if (valid && email.trim() !== "") {
    localStorage.setItem("email", email);
    success(emailInput);
    return true;
  } else if (!valid) {
    showError(emailInput, "Please , Enter a valid Email");
  } else if (email.trim() === "") {
    showError(emailInput, "Email mustn't be blank");
  }
  return false;
};

//! validate password => password at least 8 character
const validatePassword = (password) => {
  if (password.length >= 8 && password.trim() !== "") {
    success(passwordInput);
    return true;
  } else if (password.trim() === "") {
    showError(passwordInput, "Paassword mustn't be blank");
  } else {
    showError(passwordInput, "password must be at least 8 character");
  }
  return false;
};

//! Validate confirm password

const validateConfirmPassword = (password1, password2) => {
  if (password1 === password2) {
    success(confirmPasswordInput);
    return true;
  } else {
    showError(confirmPasswordInput, "The password does not match");
  }
};
//! values of all input in form \
const formInputValues = () => {
  const usernameValue = usernameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;
  return {
    usernameValue,
    emailValue,
    passwordValue,
    confirmPasswordValue,
  };
};

//! send data to api

const sendData = () => {
  const inputsValue = formInputValues();
  fetch(apiEndPoint, {
    method: "POST",
    body: JSON.stringify({
      username: inputsValue.usernameValue,
      email: inputsValue.emailValue,
      password: inputsValue.passwordValue,
      password_confirmation: inputsValue.confirmPasswordValue,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      window.location = "../success.html";
    })
    .catch((error) => alert(error.message));
};

//! all validation
const validateForm = () => {
  const inputData = formInputValues();
  if (
    validateUsername(inputData.usernameValue) &&
    validateEmail(inputData.emailValue) &&
    validatePassword(inputData.passwordValue) &&
    validateConfirmPassword(
      inputData.passwordValue,
      inputData.confirmPasswordValue
    )
  ) {
    sendData();
  }
};

//! submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});
