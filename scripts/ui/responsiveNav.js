import { isLogin, userLogout } from '../services/authorizeService.js';

const PROFILE_IMG_SRC = 'https://i.postimg.cc/6pxz26Rm/foto-selfi.jpg';

const getPathname = () => (window.location.pathname || '').split('\\').join('/');

const seedTailwind = () => {
  if (document.getElementById('tw-seed-nav')) return;

  const seed = document.createElement('div');
  seed.id = 'tw-seed-nav';
  seed.className =
    'hidden overflow-x-hidden bg-gray-950 border-b-2 border-emerald-600 shadow-lg rounded-lg rounded-md hover:bg-emerald-500/10 hover:border-emerald-400 hover:text-emerald-200 active:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 hover:bg-red-600 hover:border-red-400 active:bg-red-700 focus:ring-red-500/60';
  document.body.append(seed);
};

const getHomeHref = (path) => {
  if (path.includes('/pages/')) return '../../index.html';
  return './index.html';
};

const getWatchlistHref = (path) => {
  if (path.includes('/pages/auth/')) return '';
  if (path.includes('/pages/watchlist/')) return './index.html';
  if (path.includes('/pages/')) return '../watchlist/index.html';
  return './pages/watchlist/index.html';
};

const getLoginHref = (path) => {
  if (path.includes('/pages/auth/')) return './login.html';
  if (path.includes('/pages/')) return '../auth/login.html';
  return './pages/auth/login.html';
};

const getRegisterHref = (path) => {
  if (path.includes('/pages/auth/')) return './register.html';
  if (path.includes('/pages/')) return '../auth/register.html';
  return './pages/auth/register.html';
};

const createMenuLink = (label, href) => {
  const link = document.createElement('a');
  link.href = href;
  link.className =
    'block w-full text-left px-3 py-2 rounded-md border border-emerald-600 text-white transition-colors duration-150 hover:bg-emerald-500/10 hover:border-emerald-400 hover:text-emerald-200 active:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/60';
  link.textContent = label;
  return link;
};

const createLogoutButton = (loginHref) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className =
    'w-full text-left px-3 py-2 rounded-md border border-red-500 bg-red-500 text-white transition-colors duration-150 hover:bg-red-600 hover:border-red-400 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/60';
  button.textContent = 'LOGOUT';
  button.addEventListener('click', () => userLogout(loginHref));
  return button;
};

export const initResponsiveNav = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initResponsiveNav(), { once: true });
    return;
  }

  if (document.documentElement) document.documentElement.classList.add('overflow-x-hidden');
  if (document.body) document.body.classList.add('overflow-x-hidden');
  seedTailwind();

  const header = document.querySelector('header');
  if (!header) return;

  const desktopNav = header.querySelector('.buttons-nav') || header.querySelector('.buttons');
  if (!desktopNav) return;

  header.classList.add('relative');
  desktopNav.classList.add('max-sm:hidden');

  if (header.querySelector('#mobile-menu')) return;

  const path = getPathname();
  const isLoginPage = path.includes('/pages/auth/login.html') || path.endsWith('/login.html');
  const isRegisterPage = path.includes('/pages/auth/register.html') || path.endsWith('/register.html');

  const homeHref = getHomeHref(path);
  const watchlistHref = getWatchlistHref(path);
  const loginHref = getLoginHref(path);
  const registerHref = getRegisterHref(path);
  const showWatchlist = Boolean(watchlistHref);
  const loggedIn = isLogin();

  const controls = document.createElement('div');
  controls.className = 'sm:hidden absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 z-50';

  const profileButton = document.createElement('button');
  profileButton.type = 'button';
  profileButton.id = 'mobile-profile-button';
  profileButton.className =
    'w-10 h-10 rounded-full overflow-hidden border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/60';
  profileButton.setAttribute('aria-haspopup', 'true');
  profileButton.setAttribute('aria-expanded', 'false');
  profileButton.hidden = true;

  const profileImg = document.createElement('img');
  profileImg.src = PROFILE_IMG_SRC;
  profileImg.alt = 'Profile';
  profileImg.className = 'w-full h-full object-cover';
  profileButton.append(profileImg);

  const menuButton = document.createElement('button');
  menuButton.type = 'button';
  menuButton.id = 'mobile-menu-button';
  menuButton.className =
    'inline-flex items-center justify-center p-2 rounded-md border border-emerald-600 text-emerald-400 transition-colors duration-150 hover:bg-emerald-500/10 hover:border-emerald-400 active:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/60';
  menuButton.setAttribute('aria-controls', 'mobile-menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.hidden = true;
  menuButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';

  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.className =
    'sm:hidden absolute left-0 top-full w-full bg-gray-950 border-b-2 border-emerald-600 z-40 shadow-lg';
  mobileMenu.hidden = true;

  const menuInner = document.createElement('nav');
  menuInner.className = 'flex flex-col p-4 gap-3 text-white';

  menuInner.append(createMenuLink('ALL FILMS', homeHref));
  if (showWatchlist) menuInner.append(createMenuLink('MY WATCHLIST', watchlistHref));

  if (loggedIn) {
    menuInner.append(createLogoutButton(loginHref));
  } else if (isLoginPage) {
    menuInner.append(createMenuLink('REGISTER', registerHref));
  } else if (isRegisterPage) {
    menuInner.append(createMenuLink('LOGIN', loginHref));
  } else {
    menuInner.append(createMenuLink('LOGIN', loginHref));
  }

  mobileMenu.append(menuInner);

  const profileMenu = document.createElement('div');
  profileMenu.id = 'mobile-profile-menu';
  profileMenu.className =
    'sm:hidden absolute right-4 top-full mt-2 w-48 bg-gray-950 border border-emerald-600 rounded-lg z-40 shadow-xl';
  profileMenu.hidden = true;

  const profileMenuInner = document.createElement('div');
  profileMenuInner.className = 'p-2 flex flex-col gap-2';

  profileMenuInner.append(createMenuLink('ALL FILMS', homeHref));
  if (showWatchlist) profileMenuInner.append(createMenuLink('MY WATCHLIST', watchlistHref));
  profileMenuInner.append(createLogoutButton(loginHref));
  profileMenu.append(profileMenuInner);

  const closeAll = () => {
    mobileMenu.hidden = true;
    profileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    profileButton.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const shouldOpen = mobileMenu.hidden;
    closeAll();
    if (shouldOpen) {
      mobileMenu.hidden = false;
      menuButton.setAttribute('aria-expanded', 'true');
    }
  };

  const toggleProfile = () => {
    const shouldOpen = profileMenu.hidden;
    closeAll();
    if (shouldOpen) {
      profileMenu.hidden = false;
      profileButton.setAttribute('aria-expanded', 'true');
    }
  };

  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  profileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleProfile();
  });

  document.addEventListener('click', () => closeAll());
  window.addEventListener('resize', () => closeAll());

  controls.append(profileButton, menuButton);
  header.append(controls, mobileMenu, profileMenu);

  if (loggedIn) {
    profileButton.hidden = false;
    menuButton.hidden = true;
  } else {
    profileButton.hidden = true;
    menuButton.hidden = false;
  }
};
