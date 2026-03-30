import { errorResponse } from './errorResponse.js';
import { clearInputError } from './clearInputError.js';
import { response } from '../response/index.js';

const email = document.querySelector('#email');
const emailAlert = document.querySelector('#email-alert');
const password = document.querySelector('#password');
const passwordAlert = document.querySelector('#password-alert');
const confirmPassword = document.querySelector('#password-confirm');
const confirmPasswordAlert = document.querySelector('#password-confirm-alert');
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
  if (confirmPassword.value.trim() === '') {
    errorResponse(confirmPasswordAlert, confirmPassword, 'Confirm Password harus diisi');
    isValid = false;
  }
  if (confirmPassword.value !== password.value) {
    errorResponse(confirmPasswordAlert, confirmPassword, 'Confirm Password harus sama dengan Password');
    isValid = false;
  }
  return isValid;
};

clearInputError(email, emailAlert);
clearInputError(password, passwordAlert);
clearInputError(confirmPassword, confirmPasswordAlert);

const isEmailExist = () => {
  const emailInput = email.value;
  const existingUserRaw = localStorage.getItem('user');
  if (!existingUserRaw) return false;

  const existingUser = JSON.parse(existingUserRaw);
  if (!existingUser || !existingUser.email) return false;

  const existingEmail = existingUser.email;
  if (emailInput == existingEmail) {
    errorResponse(emailAlert, email, 'Email telah terdaftar');
    return true;
  }
  return false;
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const isFormValid = validateForm();

  if (isFormValid) {
    const existingEmailCheck = isEmailExist();
    if (!existingEmailCheck) {
      const credentials = {
        email: email.value,
        password: password.value,
      };
      localStorage.setItem('user', JSON.stringify(credentials));
      response('Berhasil mendaftarkan user', 'green');
      setTimeout(() => {
        window.location.href = './login.html';
      }, 1500);
    } else {
      return;
    }
  }
});
