export const response = (msg, color) => {
  const body = document.querySelector('body');
  body.classList.add('relative');
  const container = document.createElement('div');
  container.classList.add(
    'fixed',
    'w-auto',
    'px-4',
    'p-2',
    'font-semibold',
    `text-${color}-600`,
    'text-center',
    'top-20',
    '-right-full',
    'z-50',
    'rounded-full',
    'border-2',
    `border-${color}-600`,
    'transition-all',
    'duration-700',
    'bg-gray-200',
  );
  container.innerText = msg;
  setTimeout(() => {
    container.classList.remove('-right-full');
    container.classList.add('right-10');
    setTimeout(() => {
      container.classList.add('-right-full');
      container.classList.remove('right-10');
    }, 2500);
  }, 10);
  body.append(container);
};
