const refreshButton = document.querySelector("#refreshButton");
const status = document.querySelector("#status");
const updated = document.querySelector("#updated");
const ratesTable = document.querySelector("#ratesTable");
const currencies = ["USD", "EUR", "RUB", "UZS", "CNY"];

async function loadRates() {
  refreshButton.disabled = true;
  status.textContent = "Загрузка…";
  status.classList.remove("error");
  updated.textContent = "";
  ratesTable.textContent = "";

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/KZT");

    if (!response.ok) {
      throw new Error("Не удалось получить курсы.");
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("Сервис не смог загрузить курсы.");
    }

    currencies.forEach((currency) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const rateCell = document.createElement("td");

      nameCell.textContent = currency;
      rateCell.textContent = `${(1 / data.rates[currency]).toFixed(2)} ₸`;
      row.append(nameCell, rateCell);
      ratesTable.append(row);
    });

    status.textContent = "Курсы загружены.";
    updated.textContent = `Время обновления: ${data.time_last_update_utc}`;
  } catch (error) {
    status.textContent = `Ошибка: ${error.message || "не удалось загрузить курсы."}`;
    status.classList.add("error");
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", loadRates);
loadRates();
