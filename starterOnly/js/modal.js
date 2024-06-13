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

//Forrm DOM Elements
const form = document.querySelector("form");
const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const brtDate = document.getElementById('birthdate');
const quantityValue = document.getElementById('quantity');
const locationValue = document.querySelectorAll('input[name="location"]')
const checkboxInput = document.getElementById('checkbox1')


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


//validate functions

const validateFirst = (name) => {
  if (name.length < 2) {
    throw new Error("Votre prénom doit comprendre au moins 2 caractères.")
  }
}

const validateLast = (surname) => {
  if (surname.length < 2) {
    throw new Error("Votre nom doit comprendre au moins 2 caractères.")
  }
}

const valideEmail = (email) => {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
  if (!emailRegExp.test(email) || email.value === "") {
    throw new Error("Veuillez renseigner une adresse email valide.")
  }
}

const valideDate = (birthday) => {
  let todayDate = new Date();
  let dateRegExp = new RegExp("^((19[2-9][0-9])|(200[0-6]))(\/|-)(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])$");
  if (!dateRegExp.test(birthday) || new Date(birthday) > todayDate) {
    throw new Error("Vous devez entrer votre date de naissance.")
  }
}

const valideQuantity = (quantity) => {
  if (!quantity) {
    throw new Error("Veuillez choisir un nombre");
  }
}

const valideLocation = () => {
  for (let i = 0; i < locationValue.length; i++) {
    if (!locationValue[i].checked) {
      throw new Error("Veuillez choisir une option de localisation.");
    }
  }
}

const validateCheck = () => {
  console.log(checkboxInput)
  if (!checkboxInput.checked) {
    throw new Error("Vous devez vérifier que vous acceptez les termes et conditions.")
  }
}

//Error messages 

const throwError = (element, message) => {
  let spanErrorMessage = document.getElementById(element.id + '_error')
  
  if (!spanErrorMessage) {
    spanErrorMessage = document.createElement("span");
    element.after(spanErrorMessage);
    spanErrorMessage.id = element.id + "error";
    spanErrorMessage.parentElement.setAttribute("data-error", message);
    spanErrorMessage.parentElement.setAttribute("data-error-visible", true);
  }
  
  element.addEventListener('input', () => {
    if (spanErrorMessage) {
      spanErrorMessage.remove()
      spanErrorMessage.parentElement.setAttribute("data-error-visible", false)
    }
  })
}

const hideError = () => {
  
}


//Validate form
const validateForm = () => {

  const firstName = first.value.trim();
  const lastName = last.value.trim();
  const emailValue = email.value.trim()
  const birthdayDate = brtDate.value.trim();
  const quantity = quantityValue.valueAsNumber;


  try {
    validateFirst(firstName)
  } catch(error) {
    throwError(first, error.message)
  } 
  try {
    validateLast(lastName)
  } catch(error) {
    throwError(last, error.message)
  }
  try {
    valideEmail(emailValue)
  } catch(error) {
    throwError(email, error.message)
  }
  try {
    valideDate(birthdayDate) 
  } catch(error) {
    throwError(brtDate, error.message)
  }
  try {
    valideQuantity(quantity)
  } catch(error) {
    throwError(quantity, error.message)
  }
  try {
    valideLocation()
  } catch(error) {
    throwError(locationValue, error.message)
  }
  try {
    validateCheck()
  } catch(error) {
    throwError(checkboxInput, error.message)
  }
}

// function setError(balise, message) {
//   const errorDisplay = document.querySelector('.error')
//   const data = balise.parentElement;
//   console.log(data);
//   data.classList.add('data-error')
//   data.setAttribute('data-error-visible', true);
//   errorDisplay.innerText = message;

// }


form.addEventListener('submit', (event) => {
  event.preventDefault()
  validateForm()
});
