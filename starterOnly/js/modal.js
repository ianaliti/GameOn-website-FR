
// Add the responsive class to navbar and topnav to open and close the navbar
function editNav() {
  let x = document.getElementById("myTopnav");
  let navbar = document.getElementById("myNavbar")
  if (x.className === "topnav") {
    x.className += " responsive";
    navbar.className += " responsive"
  } else {
    x.className = "topnav";
    navbar.className = "main-navbar"
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const topnav = document.querySelector('.topnav');
const confirmModal =  document.querySelector('.confirmModal');
const confirmModalClose = document.querySelector('.confirmModalClose');
const closeModalSucc = document.querySelector('.closeModal');

// Form DOM Elements
const form = document.querySelector("form");
const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const brthDate = document.getElementById('birthdate');
const quantityValue = document.getElementById('quantity');
const locationValue = document.querySelectorAll('input[name="location"]')
const checkboxInput = document.getElementById('checkbox1')


// launch modal event 
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  topnav.style.position = "fixed";
}

// close modal event
modalClose.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  topnav.style.position = "relative";
}

// Submit form
form.addEventListener('submit', (event) => {
  event.preventDefault()
  validateForm()
})

// Validate functions

// Check that the name value length is more than 2 characters
const validateFirst = (name) => {
  let nameRegex = new RegExp("([a-zA-Z_\s]+)");
  if (!nameRegex.test(name) || name.length < 2) {
    throw new Error("Votre prénom doit comprendre au moins 2 caractères.")
  }
}

// Check that the length of the last name value is more than 2 characters
const validateLast = (surname) => {
  let nameRegex = new RegExp("([a-zA-Z_\s]+)");
  if (!nameRegex.test(surname)|| surname.length < 2) {
    throw new Error("Votre nom doit comprendre au moins 2 caractères.")
  }
}

// Check that the email matches the regex and its length is more than zero
const valideEmail = (email) => {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
  if (!emailRegExp.test(email) || email.value === "") {
    throw new Error("Veuillez renseigner une adresse email valide.")
  }
}

// Check that the birthday matches the regex and that date less than today current date
const valideDate = (birthday) => {
  let todayDate = new Date();
  let dateRegExp = new RegExp("^((19[2-9][0-9])|(200[0-6]))(\/|-)(0[1-9]|1[1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])$");
  if (!dateRegExp.test(birthday) || new Date(birthday) > todayDate) {
    throw new Error("Vous devez entrer votre date de naissance.")
  }
}

// Check that the value is a number
const valideQuantity = (num) => {
  if (!parseInt(num)) {
    throw new Error("Veuillez choisir un nombre");
  }
}

// Check that the location is selected
const valideLocation = (locationValue) => {
  const isChecked = Array.from(locationValue).some(loc => loc.checked);
  if (!isChecked) {
    throw new Error("Veuillez choisir une option de localisation.");
  }
}

// Check that the checkbox with conditions is selected
const validateCheck = () => {
  if (!checkboxInput.checked) {
    throw new Error("Vous devez vérifier que vous acceptez les termes et conditions.")
  }
}

//Error messages 

// Send specific error message 
// Add data-error id and data-error-visible true in CSS
const throwError = (element, message) => {
  element.parentElement.setAttribute("data-error", message);
  element.parentElement.setAttribute("data-error-visible", true);
}

// 2nd submit, hide a valid field previous invlid
// Remove data-error id and switch data-error-visible to false in CSS
const hideError = (element) => {
  element.parentElement.removeAttribute("data-error");
  element.parentElement.removeAttribute("data-error-visible", true);
}


// Validate form
const validateForm = () => {
  let isValide = true;

// Create an array field with objects to maintain the value, DOM elements, and functions
  const fields = [
    { value: first.value.trim(), element: first, validator: validateFirst }, 
    { value: last.value.trim(), element: last, validator: validateLast },
    { value: email.value.trim(), element: email, validator: valideEmail },
    { value: brthDate.value.trim(), element: brthDate, validator: valideDate },
    { value: quantityValue.valueAsNumber, element: quantityValue, validator: valideQuantity },
    { value: locationValue, element: locationValue[0], validator: valideLocation },
    { value: !checkboxInput.checked, element: checkboxInput, validator: validateCheck }
  ]

  // Check if the validator function runs with the value without error. If yes, hide the error. If no, display an error with the corresponding message
  fields.forEach(({ value, element, validator }) => {
    try {
      validator(value);
      hideError(element);
    } catch (error) {
      throwError(element, error.message);
      isValide = false;
    }
  });

  if (isValide) {
    successMessage()
  }

}

// Check if the validation function runs without errors. If so, clear the form, close it, and show a new success modal.
const successMessage = () => {
  if (validateFirst && validateLast && valideEmail && valideDate && valideQuantity && valideLocation && validateCheck) {
    form.reset()
    closeModal()
    confirmModal.style.display = "block";
    topnav.style.position = "fixed";
    closeModalSuccess()
  }
}

// Close the success modal using the "ferme" button and modalbg button
const closeModalSuccess = () => {
  closeModalSucc.addEventListener('click', closeConfirmModal)
  confirmModalClose.addEventListener('click', closeConfirmModal);

  function closeConfirmModal () {
    confirmModal.style.display = "none";
    topnav.style.position = "relative";
  }
}