// Проверка формы:
// 1. Если поля пустые, после отметки согласия показывается сообщение «Введите имя».
// 2. Если телефон неправильный, показывается ошибка телефона.
// 3. Если возраст 15 лет, появляется сообщение о возрасте от 16 лет.
// 4. При возрасте 16 лет, правильном телефоне и отмеченном согласии запись проходит.
// 5. Если флажок снят, кнопка «Записаться» выключена.

const form = document.querySelector("#signupForm");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const ageInput = document.querySelector("#age");
const agreementInput = document.querySelector("#agreement");
const submitButton = document.querySelector("#submitButton");
const message = document.querySelector("#message");
const nameStorageKey = "signup-name";

nameInput.value = localStorage.getItem(nameStorageKey) || "";

function showMessage(text, type) {
  message.textContent = text;
  message.classList.remove("error", "success");
  message.classList.add(type);
}

nameInput.addEventListener("input", () => {
  localStorage.setItem(nameStorageKey, nameInput.value);
});

agreementInput.addEventListener("change", () => {
  submitButton.disabled = !agreementInput.checked;

  if (!agreementInput.checked) {
    showMessage("Отметьте согласие с правилами Академии.", "error");
  } else {
    message.textContent = "";
    message.classList.remove("error", "success");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const age = Number(ageInput.value);
  const phoneDigits = phone.replace(/\D/g, "");

  if (name === "") {
    showMessage("Введите имя.", "error");
    return;
  }

  if (phoneDigits.length < 10) {
    showMessage("Введите правильный номер телефона.", "error");
    return;
  }

  if (ageInput.value === "" || age < 16) {
    showMessage("Курс для слушателей от 16 лет.", "error");
    return;
  }

  if (!agreementInput.checked) {
    showMessage("Согласитесь с правилами Академии.", "error");
    return;
  }

  showMessage(`Спасибо, ${name}! Вам ${age} лет. Вы записаны на курс.`, "success");
  form.reset();
  submitButton.disabled = true;
  localStorage.removeItem(nameStorageKey);
});
