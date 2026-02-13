import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/timer.css';

const inp = document.querySelector('#datetime-picker');
const btn = document.querySelector('[type="button"]');

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

btn.addEventListener('click', onTimer);
console.dir(btn);
btn.disabled = true;

let timerId = null;
let userSelectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  // minDate: 'today',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const today = Date.now();
    userSelectDate = Date.parse(selectedDates[0]);

    if (userSelectDate <= today) {
      iziToast.error({
        title: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 3000,
        close: false,
      });
      return;
    }
    btn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onTimer() {
  btn.disabled = true;
  inp.disabled = true;
  startTimer();
  timerId = setInterval(startTimer, 1000);
}

function startTimer() {
  const time = Date.now();
  const deltaTime = userSelectDate - time;
  if (deltaTime <= 0) {
    clearInterval(timerId);
    timerDays.textContent = addZero(0);
    timerHours.textContent = addZero(0);
    timerMinutes.textContent = addZero(0);
    timerSeconds.textContent = addZero(0);
    inp.disabled = false;
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  timerDays.textContent = addZero(days);
  timerHours.textContent = addZero(hours);
  timerMinutes.textContent = addZero(minutes);
  timerSeconds.textContent = addZero(seconds);
}

function addZero(number) {
  return String(number).padStart(2, '0');
}
