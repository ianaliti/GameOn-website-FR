function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

//form validation 

// function validateForm() {
//   validateInputs()

//   const first = document.getElementById('first');
//   const last = document.getElementById('last');
//   const email = document.getElementById('email');


//   const setError = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = message;
//     inputControl.classList.add('error');
//     inputControl.classList.remove('success')
//   }

//   const setSuccess = element => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = '';
//     inputControl.classList.add('success');
//     inputControl.classList.remove('error');
//   };

//   const isValidEmail = email => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
//   }

//   const validateInputs = () => {
//     const first = first.value.trim();
//     const last = last.value.trim();
//     const emailValue = email.value.trim();


//     if (first === '') {
//       setError(first, 'Username is required');
//     } else {
//       setSuccess(username);
//     }

//     if (last === '') {
//       setError(last, 'Username is required');
//     } else {
//       setSuccess(username);
//     }

//     if (emailValue === '') {
//       setError(email, 'Email is required');
//     } else if (!isValidEmail(emailValue)) {
//       setError(email, 'Provide a valid email address');
//     } else {
//       setSuccess(email);
//     }
//   };
// }
  