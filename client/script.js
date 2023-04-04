import bot from '/assets/bot.svg';
import user from '/assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat__container');

let loadInterval;

function loader(el) {
  el.textContent = ' ';
  loadInterval = setInterval(() => {
    el.textContent += '.';
    if (el.textContent === '....') {
      el.textContent = ' ';
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
  const timeBasedId = Date.now();
  console.log(timeBasedId);

  return `id-${timeBasedId}`;
}

function chatStripe(isBot, value, uniqueId) {
  return `
    <div class="wrapper" ${isBot && 'ai'}>
      <div class="chat">
        <div class="profile">
          <img src="${isBot ? bot : user}" alt="${isBot ? 'bot' : 'user'}" />
        </div>
        <div class="message" id="${uniqueId}">${value}</div>
      </div>
    </div>
  `
}

const handleSubmit = async function (e) {
  e.preventDefault();

  const data = new FormData(form);

  // user's messages
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  // bot's messages
  const uniqueId = generateId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  window.scrollTo({
    top: 1000,
    behavior: "smooth"
  });
  // chatContainer.scrollTop = chatContainer.clientHeight;

  const botMessage = document.querySelector(`#${uniqueId}`);
  loader(botMessage);
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
})