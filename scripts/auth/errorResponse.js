export const errorResponse = (alertClass, className, msg) => {
  alertClass.classList.remove('invisible');
  alertClass.innerText = msg;
  className.classList.add('border-red-500', 'placeholder-red-500');
};
