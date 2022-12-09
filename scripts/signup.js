//select all elements
const createAccountBtn = document.querySelector(".button__container button");
const usernameInput = document.querySelector("input#username");
const emailInput = document.querySelector("input#email");
const passwordInput = document.querySelector("input#password");
const confirmPasswordInput = document.querySelector("input#confirmPassword");
const form = document.querySelector("form");

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
  const pattern = /^[a-z][a-z0-9]*([a-z]+){5,15}$/gi;
  const valid = pattern.test(username);
  if (valid) {
    success(usernameInput);
    return true;
  } else if (username.trim() === "") {
    showError(usernameInput, "Username mustn't leave blank");
    return;
  }
  if (username.length < 5) {
    showError(usernameInput, "Username must too short should between 5-15");
    return;
  } else if (username.length > 15) {
    showError(usernameInput, "Username must too long should between 5-15");
    return;
  } else {
    showError(
      usernameInput,
      "Username must consist of 5 to 15 characters, only letters and numbers are allowed, with no numbers at the beginning or the end"
    );
    return;
  }
};

//! Validate Email
const validateEmail = (email) => {
  const regex = /^\w+@[a-z]+\.[a-z]{2,3}/;
  const valid = regex.test(email);
  if (valid) {
    localStorage.setItem("email", email);
    success(emailInput);
    return true;
  } else {
    showError(emailInput, "Please , Enter a valid Email");
    return;
  }
};

//! validate password => password at least 8 character
const validatePassword = (password) => {
  if (password.length >= 8) {
    success(passwordInput);
    return true;
  } else {
    showError(passwordInput, "password must be at least 8 character");
    return;
  }
};

//! Validate confirm password

const validateConfirmPassword = (password1, password2) => {
  if (password2.length >= 8) {
    if (password1 === password2) {
      success(confirmPasswordInput);
      return true;
    } else {
      showError(confirmPasswordInput, "The password does not match");
    }
  } else {
    showError(confirmPasswordInput, "password should be at least 8 character");
  }
};

const valiadeForm = () => {
  const usernameValue = usernameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;
  if (
    validateUsername(usernameValue) &&
    validateEmail(emailValue) &&
    validatePassword(passwordValue) &&
    validateConfirmPassword(passwordValue, confirmPasswordValue)
  ) {
    return true;
  }
};

//! values of all input in form \
const formInputValues = () => {
  const usernameValue = usernameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;
  //* returns all data form
  return {
    usernameValue,
    emailValue,
    passwordValue,
    confirmPasswordValue,
  };
};

//! send data to api

const sendData = async () => {
  const inputsValue = formInputValues();
  await fetch("https://goldblv.com/api/hiring/tasks/register", {
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
      if (data.status === 200) {
        window.location = "../success.html";
      } else {
        alert("Status 404");
      }
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
createAccountBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validateForm();
});
