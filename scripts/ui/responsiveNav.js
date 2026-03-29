import { isLogin, userLogout } from '../services/authorizeService.js';

const PROFILE_IMG_SRC = 'https://i.postimg.cc/6pxz26Rm/foto-selfi.jpg';

const ensureResponsiveNavStyles = () => {
  if (document.getElementById('responsive-nav-styles')) return;

  const style = document.createElement('style');
  style.id = 'responsive-nav-styles';
  style.textContent = `
    html,
    body {
      overflow-x: hidden;
    }

    #mobile-menu a,
    #mobile-profile-menu a {
      transition: background-color 150ms, border-color 150ms, color 150ms;
      cursor: pointer;
    }

    #mobile-menu a:hover,
    #mobile-profile-menu a:hover {
      background-color: rgba(16, 185, 129, 0.12);
      border-color: rgba(52, 211, 153, 1);
      color: rgba(167, 243, 208, 1);
    }

    #mobile-menu a:active,
    #mobile-profile-menu a:active {
      background-color: rgba(16, 185, 129, 0.18);
    }

    #mobile-menu button,
    #mobile-profile-menu button {
      transition: background-color 150ms, border-color 150ms, color 150ms;
      cursor: pointer;
    }

    #mobile-menu button:hover,
    #mobile-profile-menu button:hover {
      filter: brightness(1.02);
    }

    #mobile-menu button:active,
    #mobile-profile-menu button:active {
      filter: brightness(0.98);
    }

    #mobile-menu-button {
      transition: background-color 150ms, border-color 150ms;
      cursor: pointer;
    }

    #mobile-menu-button:hover {
      background-color: rgba(16, 185, 129, 0.12);
      border-color: rgba(52, 211, 153, 1);
    }

    #mobile-menu-button:active {
      background-color: rgba(16, 185, 129, 0.18);
    }

    #mobile-menu a:focus-visible,
    #mobile-profile-menu a:focus-visible,
    #mobile-menu button:focus-visible,
    #mobile-profile-menu button:focus-visible,
    #mobile-menu-button:focus-visible,
    #mobile-profile-button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.55);
    }
  `;
  document.head.append(style);
};

const getPaths = () => {
  const rawPath = window.location.pathname || '';
  const path = rawPath.replace(/\\/g, '/');

  const inPages = path.includes('/pages/');
  const inAuth = path.includes('/pages/auth/');
  const inWatchlist = path.includes('/pages/watchlist/');

  return {
    home: inPages ? '../../index.html' : './index.html',
    watchlist: inPages ? (inWatchlist ? './index.html' : '../watchlist/index.html') : './pages/watchlist/index.html',
    login: inPages ? (inAuth ? './login.html' : '../auth/login.html') : './pages/auth/login.html',
    register: inPages ? (inAuth ? './register.html' : '../auth/register.html') : './pages/auth/register.html',
  };
};

const createLinkButton = (label, href) => {
  const link = document.createElement('a');
  link.href = href;
  link.className =
    'block w-full text-left px-3 py-2 rounded-md border border-emerald-600 text-white cursor-pointer transition-colors duration-150 hover:bg-emerald-500/10 hover:border-emerald-400 hover:text-emerald-200 active:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/60';
  link.textContent = label;
  return link;
};

export const initResponsiveNav = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initResponsiveNav(), { once: true });
    return;
  }

  ensureResponsiveNavStyles();

  const header = document.querySelector('header');
  if (!header) return;

  const desktopNav = header.querySelector('.buttons-nav') || header.querySelector('.buttons');
  if (!desktopNav) return;

  header.classList.add('relative');
  desktopNav.classList.remove('max-sm:hidden');

  if (header.querySelector('#mobile-menu')) return;

  const paths = getPaths();
  const loggedIn = isLogin();

  const controls = document.createElement('div');
  controls.className = 'absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 z-50 hidden';

  const profileButton = document.createElement('button');
  profileButton.type = 'button';
  profileButton.id = 'mobile-profile-button';
  profileButton.className = 'hidden w-10 h-10 rounded-full overflow-hidden border border-emerald-600';
  profileButton.setAttribute('aria-haspopup', 'true');
  profileButton.setAttribute('aria-expanded', 'false');

  const profileImg = document.createElement('img');
  profileImg.src = PROFILE_IMG_SRC;
  profileImg.alt = 'Profile';
  profileImg.className = 'w-full h-full object-cover';
  profileButton.append(profileImg);

  const menuButton = document.createElement('button');
  menuButton.type = 'button';
  menuButton.id = 'mobile-menu-button';
  menuButton.className =
    'inline-flex items-center justify-center p-2 rounded border border-emerald-600 text-emerald-400 cursor-pointer transition-colors duration-150 hover:bg-emerald-500/10 hover:border-emerald-400 active:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/60';
  menuButton.setAttribute('aria-controls', 'mobile-menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';

  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.className =
    'absolute left-0 top-full w-full bg-gray-950/95 backdrop-blur border-b-2 border-emerald-600 hidden z-40 shadow-lg';

  const menuInner = document.createElement('nav');
  menuInner.className = 'flex flex-col p-4 gap-3 text-white';

  menuInner.append(createLinkButton('ALL FILMS', paths.home));

  if (!window.location.pathname.replace(/\\/g, '/').includes('/pages/auth/')) {
    menuInner.append(createLinkButton('MY WATCHLIST', paths.watchlist));
  }

  if (loggedIn) {
    const logoutButton = document.createElement('button');
    logoutButton.type = 'button';
    logoutButton.className =
      'w-full text-left px-3 py-2 rounded-md border border-red-500 text-white bg-red-500 cursor-pointer transition-colors duration-150 hover:bg-red-600 hover:border-red-400 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/60';
    logoutButton.textContent = 'LOGOUT';
    logoutButton.addEventListener('click', () => userLogout(paths.login));
    menuInner.append(logoutButton);
  } else {
    if (window.location.pathname.replace(/\\/g, '/').includes('/pages/auth/login.html')) {
      menuInner.append(createLinkButton('REGISTER', paths.register));
    } else if (window.location.pathname.replace(/\\/g, '/').includes('/pages/auth/register.html')) {
      menuInner.append(createLinkButton('LOGIN', paths.login));
    } else {
      menuInner.append(createLinkButton('LOGIN', paths.login));
    }
  }

  mobileMenu.append(menuInner);

  const profileMenu = document.createElement('div');
  profileMenu.id = 'mobile-profile-menu';
  profileMenu.className =
    'absolute right-4 top-full mt-2 w-48 bg-gray-950/95 backdrop-blur border border-emerald-600 rounded-lg hidden z-40 shadow-xl';

  const profileMenuInner = document.createElement('div');
  profileMenuInner.className = 'p-2 flex flex-col gap-2';

  profileMenuInner.append(createLinkButton('ALL FILMS', paths.home));
  if (!window.location.pathname.replace(/\\/g, '/').includes('/pages/auth/')) {
    profileMenuInner.append(createLinkButton('MY WATCHLIST', paths.watchlist));
  }

  const profileLogout = document.createElement('button');
  profileLogout.type = 'button';
  profileLogout.className =
    'w-full text-left px-3 py-2 rounded-md bg-red-500 text-white cursor-pointer transition-colors duration-150 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/60';
  profileLogout.textContent = 'LOGOUT';
  profileLogout.addEventListener('click', () => userLogout(paths.login));

  profileMenuInner.append(profileLogout);
  profileMenu.append(profileMenuInner);

  const closeAll = () => {
    mobileMenu.classList.add('hidden');
    profileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    profileButton.setAttribute('aria-expanded', 'false');
  };

  const hide = (el) => {
    el.classList.add('hidden');
    el.style.display = 'none';
  };

  const show = (el) => {
    el.classList.remove('hidden');
    el.style.removeProperty('display');
  };

  const desktopMedia = window.matchMedia('(min-width: 640px)');
  const syncLayout = () => {
    if (desktopMedia.matches) {
      show(desktopNav);
      hide(controls);
      hide(menuButton);
      hide(profileButton);
      closeAll();
      return;
    }

    hide(desktopNav);
    show(controls);
    if (loggedIn) {
      hide(menuButton);
      show(profileButton);
    } else {
      show(menuButton);
      hide(profileButton);
    }
  };

  const toggleMenu = () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    closeAll();
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuButton.setAttribute('aria-expanded', 'true');
    }
  };

  const toggleProfile = () => {
    const isHidden = profileMenu.classList.contains('hidden');
    closeAll();
    if (isHidden) {
      profileMenu.classList.remove('hidden');
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
  window.addEventListener('resize', () => {
    closeAll();
    syncLayout();
  });
  desktopMedia.addEventListener('change', () => {
    closeAll();
    syncLayout();
  });

  controls.append(profileButton, menuButton);
  header.append(controls, mobileMenu, profileMenu);
  syncLayout();
};
