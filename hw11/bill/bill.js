const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people");
const tipSelect = document.querySelector("#tip");
const totalOutput = document.querySelector("#total");
const perPersonOutput = document.querySelector("#perPerson");
const message = document.querySelector("#message");
const themeButton = document.querySelector("#themeButton");

function calculateBill() {
  const bill = Number(billInput.value);
  const people = Number(peopleInput.value);
  const tip = Number(tipSelect.value);

  if (billInput.value === "" || bill < 0 || people < 1) {
    message.textContent = "Введите сумму от 0 и количество человек не меньше 1.";
    message.classList.add("error");
    totalOutput.textContent = "—";
    perPersonOutput.textContent = "—";
    return;
  }

  const total = Math.round(bill + bill * tip);
  const perPerson = Math.round(total / people);

  message.textContent = "";
  message.classList.remove("error");
  totalOutput.textContent = total;
  perPersonOutput.textContent = perPerson;
}

billInput.addEventListener("input", calculateBill);
peopleInput.addEventListener("input", calculateBill);
tipSelect.addEventListener("input", calculateBill);

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeButton.textContent = "Светлая тема";
  } else {
    themeButton.textContent = "Тёмная тема";
  }
});

calculateBill();
