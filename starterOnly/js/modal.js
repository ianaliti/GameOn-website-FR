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
const successModal = document.querySelector('.successModal');
const topnav = document.querySelector('.topnav');
const heroSection = document.querySelector('.hero-section');
// const footer = document.querySelector('footer');

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

// close modal event
modalClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  topnav.style.position = "fixed";
  heroSection.style.display = "none";
  // footer.style.display = "none;"
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  topnav.style.position = "relative";
  heroSection.style.display = "block";
  // footer.style.display = "block;"
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

const valideQuantity = (num) => {
  if (!parseInt(num)) {
    throw new Error("Veuillez choisir un nombre");
  }
}

const valideLocation = () => {
  const isChecked = Array.from(locationValue).some(loc => loc.checked);
  if (!isChecked) {
    throw new Error("Veuillez choisir une option de localisation.");
  }
}

const validateCheck = () => {
  if (!checkboxInput.checked) {
    throw new Error("Vous devez vérifier que vous acceptez les termes et conditions.")
  }
}

//Error messages 

const throwError = (element, message) => {
  element.parentElement.setAttribute("data-error", message);
  element.parentElement.setAttribute("data-error-visible", true);
}

const hideError = (element) => {
  element.parentElement.removeAttribute("data-error");
  element.parentElement.removeAttribute("data-error-visible", true);
}



//Validate form
const validateForm = () => {

  const firstName = first.value.trim();
  const lastName = last.value.trim();
  const emailValue = email.value.trim()
  const birthdayDate = brtDate.value.trim();
  const quantity = quantityValue.valueAsNumber;
  const parentLocation = locationValue[0];

  let isValide = true;


  try {
    validateFirst(firstName)
    hideError(first)
  } catch (error) {
    throwError(first, error.message)
    isValide = false;
  }
  try {
    validateLast(lastName)
    hideError(last)
  } catch (error) {
    throwError(last, error.message)
    isValide = false;
  }
  try {
    valideEmail(emailValue)
    hideError(email)
  } catch (error) {
    throwError(email, error.message)
    isValide = false;
  }
  try {
    valideDate(birthdayDate)
    hideError(brtDate)
  } catch (error) {
    throwError(brtDate, error.message)
    isValide = false;
  }
  try {
    valideQuantity(quantity)
    hideError(quantityValue)
  } catch (error) {
    throwError(quantityValue, error.message)
    isValide = false;
  }
  try {
    valideLocation()
    hideError(parentLocation)
  } catch (error) {
    throwError(parentLocation, error.message)
    isValide = false;
  }
  try {
    validateCheck()
    hideError(checkboxInput)
  } catch (error) {
    throwError(checkboxInput, error.message)
    isValide = false;
  }
  if (isValide) {
    successMessage()
    closeModalSuccess()
  }

}

const successMessage = () => {
  if (validateFirst && validateLast && valideEmail && valideDate && valideQuantity && valideLocation && validateCheck) {
    form.reset()
    closeModal()
    document.querySelector('.confirmModal').style.display = "block";
    topnav.style.position = "fixed";
    heroSection.style.display = "none";
    // footer.style.display = "none;"
    closeModalSuccess()
  }
}

const closeModalSuccess = () => {
  const confirmModalClose = document.querySelector('.confirmModalClose');
  const closeModalSucc = document.querySelector('.closeModal')

  closeModalSucc.addEventListener('click', closeConfirmModal)
  confirmModalClose.addEventListener('click', closeConfirmModal);

  function closeConfirmModal() {
    document.querySelector('.confirmModal').style.display = "none";
    topnav.style.position = "relative";
    heroSection.style.display = "block";
    // footer.style.display = "block;"
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  validateForm()
})
