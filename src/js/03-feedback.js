import throttle from 'lodash.throttle';
// Запис ключа до сховища у КОНСТАНТУ для уникнення антипатерну
const LOCALSTORAGE_KEY = 'feedback-form-state';
//  Пошук форми у DOM
const feedbackForm = document.querySelector('.feedback-form');

// Додавання слухачів подій на форму
feedbackForm.addEventListener('input', throttle(onInput, 500));
feedbackForm.addEventListener('submit', onFeedBackFormSubmit);

// створення порожнього об'єкта для збору введених даних
let formData = {};

//  виклик функції для ініціалізації форми при перезавантаженні сторінки
initForm();

//  колбек-функція для події на інпуті
function onInput(e) {
  // запис даних в об'єкт
  formData[e.target.name] = e.target.value;
  // перетворення даних у JSON і подальше зберігання у localStorage
  const serializedFormData = JSON.stringify(formData);
  localStorage.setItem(LOCALSTORAGE_KEY, serializedFormData);
}

function initForm() {
  // отримання даних з localStorage
  let savedData = localStorage.getItem(LOCALSTORAGE_KEY);

  //  якщо щось зберігається у localStorage, парсимо це і заповнюємо відповідні поля форми
  if (savedData) {
    try {
      savedData = JSON.parse(savedData);
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }

    Object.entries(savedData).forEach(([name, value]) => {
      feedbackForm.elements[name].value = value;
    });
  }
}

//  виведення об'єкта з полями і значеннями в консоль, очищення сховища і форми
function onFeedBackFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { email, message },
  } = e.currentTarget;

  if (!email.value || !message.value) {
    return alert('Please fill in all the fields!');
  }

  console.log(formData);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  e.currentTarget.reset();
}
