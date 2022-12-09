const emailUser = document.querySelector(".details .heading p");
const getEmail = localStorage.getItem("email");
emailUser.textContent = getEmail;
