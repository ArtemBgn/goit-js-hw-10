import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/snackbar.css';

const formEl = document.querySelector('form.form');
// const inpValue = formEl.delay.value;
// const statePromis = formEl.state.value;
formEl.addEventListener('submit', onCreatePromis);

function onCreatePromis(e) {
  e.preventDefault();
  const inpValue = +formEl.delay.value;
  const statePromis = formEl.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (statePromis === 'fulfilled') {
        resolve(inpValue);
      } else {
        reject(inpValue);
      }
    }, inpValue);
  });

  promise
    .then(result =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${result}ms`,
        backgroundColor: 'rgba(23, 124, 23, 0.7)',
        messageColor: '#FFF',
        position: 'topRight',
      })
    )
    .catch(error =>
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        backgroundColor: 'rgba(173, 41, 41, 0.7)',
        messageColor: '#FFF',
        position: 'topRight',
      })
    );
  formEl.reset();
}
//
//function startPromis() {}
