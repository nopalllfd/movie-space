import { isLogin, userLogout } from '../services/authorizeService.js';

export const renderLoginButton = (loginPagePath) => {
  if (isLogin) {
    const header = document.querySelector('header');
    const loginButton = document.getElementById('login-button');
    const profileIcon = document.createElement('div');
    const img = document.createElement('img');
    const loginButtonContainer = document.getElementById('login-link');
    const modalContainer = document.createElement('div');

    const buttonContainer = document.querySelector('.buttons-nav');
    img.setAttribute('src', 'https://i.postimg.cc/6pxz26Rm/foto-selfi.jpg');
    profileIcon.classList.add('w-10', 'h-10', 'rounded-full', 'object-cover');
    img.classList.add('rounded-full', 'w-10', 'h-10', 'object-cover', 'cursor-pointer');
    profileIcon.append(img);
    console.log(img);
    modalContainer.classList.add('w-30', 'bg-white', 'h-12', 'absolute', 'right-20', '-bottom-10', 'transition', 'rounded', 'flex', 'items-center', 'justify-center', 'hidden');

    const loginStatus = isLogin();
    if (loginStatus) {
      loginButton.innerText = 'LOGOUT';
      loginButton.classList.add('bg-red-500', 'text-white');
      modalContainer.append(loginButton);
      header.append(modalContainer);
      loginButton.addEventListener('click', () => userLogout(loginPagePath));
      buttonContainer.replaceChild(profileIcon, loginButtonContainer);
      img.addEventListener('click', () => {
        modalContainer.classList.toggle('hidden');
      });
    }
  }
};
