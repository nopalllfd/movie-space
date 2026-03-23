import { errorResponse } from './errorResponse.js';
import { clearInputError } from './clearInputError.js';

const email = document.querySelector('#email');
const emailAlert = document.querySelector('#email-alert');
const password = document.querySelector('#password');
const passwordAlert = document.querySelector('#password-alert');
const loginForm = document.querySelector('form');

const validateForm = () => {
  let isValid = true;
  if (email.value.trim() === '') {
    errorResponse(emailAlert, email, 'Email Password harus diisi');
    isValid = false;
  }

  if (password.value.trim() === '') {
    errorResponse(passwordAlert, password, 'Password harus diisi');
    isValid = false;
  }
  return isValid;
};

clearInputError(email, emailAlert);
clearInputError(password, passwordAlert);

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const isFormValid = validateForm();

  if (isFormValid) {
    window.location.href = '../../index.html';
  }
});
