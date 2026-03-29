export const isLogin = () => {
  const loginStatus = localStorage.getItem('isLogin');
  if (loginStatus == 'yes') {
    return true;
  } else {
    return false;
  }
};

export const userLogout = (route) => {
  localStorage.setItem('isLogin', 'no');
  return (window.location.href = route);
};
