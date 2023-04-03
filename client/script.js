import bot from '/assets/bot.svg';
import user from '/assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat__container');

let loadInterval;

function loader(el) {
  el.textContent = '';
  loadInterval = setInterval(() => {
    el.textContent += '.';
    if (el.textContent === '....') {
      el.textContent = '';
    }
  }, 300)
}

function typer(el, text) {
  let i = 0;
  let interval = setInterval(() => {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 20)
}

function generateId() {
  const timeBased = Date.now();
  const randomNum = Math.random();
  const randomStr = randomNum.toString(16);

  return `id-${timeBased}-${randomStr}`;
}