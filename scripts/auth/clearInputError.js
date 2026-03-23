export const clearInputError = (className, alertClass) => {
  className.addEventListener('input', () => {
    alertClass.classList.add('invisible');
    className.classList.remove('border-red-500', 'placeholder-red-500');
  });
};
