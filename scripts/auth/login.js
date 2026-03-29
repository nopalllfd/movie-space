import { errorResponse } from './errorResponse.js';
import { clearInputError } from './clearInputError.js';
import { response } from '../response/index.js';
import { initResponsiveNav } from '../ui/responsiveNav.js';

initResponsiveNav();

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
    const getUserRaw = localStorage.getItem('user');
    if (!getUserRaw) {
      response('Akun tidak ditemukan', 'red');
      return;
    }
    const getUser = JSON.parse(getUserRaw);

    if (email.value === getUser.email && password.value === getUser.password) {
      response('Berhasil login', 'green');
      setTimeout(() => {
        localStorage.setItem('isLogin', 'yes');
        window.location.href = '../../index.html';
      }, 1500);
    } else {
      response('Gagal login, kredensial salah', 'red');
    }
  }
});
