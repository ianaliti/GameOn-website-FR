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
const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const form = document.querySelector("form");


email.addEventListener("change", () => {
  console.log(email.value)
})




// const setError = (element, message) => {
//   const formData = element.parentElement;
//   const errorDisplay = formData.querySelector('.error');

//   errorDisplay.innerText = message;
//   formData.classList.add('data-error');
//   formData.classList.remove('success')
// }



// function setError(element, message) {
//   const data = element.parentElement;
//   const errorDisplay = document.querySelector('.error');
//   if (element.value === '') {
//     data.classList.add('data-error')
//     errorDisplay.innerText = message;
//   } else {
//     data.classList.remove('data-error')
//   }
// }



const setSuccess = element => {
  const data = element.parentElement;
  const errorDisplay = document.querySelector('.error');

  errorDisplay.innerText = '';
  data.classList.add('success');
  data.classList.remove('error');
};

const isValidEmail = email => {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
  return emailRegExp.test((email).toLowerCase());
}

const validateForm = () => {
  const firstName = first.value.trim();
  const lastName = last.value.trim();
  const emailValue = email.value.trim();


  if (firstName === '') {
    setError(first, "Votre prénom doit comprendre au moins 2 caractères alphabétiques.");
    console.log('nope')
  } else {
    // setSuccess(firstName);
    console.log('yep')
  }

  if (lastName === '') {
    setError(last, "Votre nom doit comprendre au moins 2 caractères alphabétiques.");
  } else {
    // setSuccess(lastName);
  }

  if (emailValue === '') {
    setError(email, "Veuillez renseigner une adresse email valide.");
  } else if (!isValidEmail(emailValue)) {
    setError(emailValue);
  } else {
    // setSuccess(emailValue);
  }

  console.log('done')
}

function setError(balise, message) {
  const errorDisplay = document.querySelector('.error')
  const data = balise.parentElement;
  console.log(data);
  data.classList.add('data-error')
  data.setAttribute('data-error-visible', true);
  errorDisplay.innerText = message;

}


form.addEventListener('submit', (event) => {

  event.preventDefault()
  validateForm()
});
 