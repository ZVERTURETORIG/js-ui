// В ответе API массив товаров находится в поле products.
// У товара используются поля title, price, category и thumbnail.

// Состояние страницы
const state = {
  products: [],
  search: "",
  category: "",
  loading: true,
  error: ""
};

const productsElement = document.querySelector("#products");
const messageElement = document.querySelector("#message");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

// Показываем товары, которые подходят под поиск и категорию
function render() {
  productsElement.replaceChildren();

  if (state.loading) {
    messageElement.textContent = "Загрузка...";
    return;
  }

  if (state.error) {
    messageElement.textContent = state.error;
    return;
  }

  const searchText = state.search.toLowerCase();
  const visibleProducts = state.products.filter(function (product) {
    const matchesSearch = product.title.toLowerCase().includes(searchText);
    const matchesCategory = state.category === "" || product.category === state.category;
    return matchesSearch && matchesCategory;
  });

  messageElement.textContent = visibleProducts.length === 0 ? "Товары не найдены." : "";

  visibleProducts.forEach(function (product) {
    const card = document.createElement("article");
    card.className = "card";

    const image = document.createElement("img");
    image.src = product.thumbnail;
    image.alt = product.title;

    const title = document.createElement("h2");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `${product.price} $`;

    const category = document.createElement("p");
    category.textContent = `Категория: ${product.category}`;

    card.append(image, title, price, category);
    productsElement.append(card);
  });
}

function fillCategories() {
  const categories = [];
  state.products.forEach(function (product) {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  categories.sort();
  categorySelect.replaceChildren();

  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "Все категории";
  categorySelect.append(allOption);

  categories.forEach(function (categoryName) {
    const option = document.createElement("option");
    option.value = categoryName;
    option.textContent = categoryName;
    categorySelect.append(option);
  });
}

// Загружаем товары один раз при открытии страницы
async function loadProducts() {
  state.loading = true;
  state.error = "";
  render();

  try {
    const response = await fetch("https://dummyjson.com/products?limit=12");
    if (!response.ok) {
      throw new Error("Не удалось загрузить товары.");
    }

    const data = await response.json();
    state.products = data.products;
    fillCategories();
    state.loading = false;
    render();
  } catch (error) {
    state.loading = false;
    state.error = "Не удалось загрузить товары. Проверьте подключение к интернету.";
    render();
  }
}

// Обработчики событий меняют фильтры и перерисовывают уже загруженный список
searchInput.addEventListener("input", function () {
  state.search = searchInput.value;
  render();
});

categorySelect.addEventListener("change", function () {
  state.category = categorySelect.value;
  render();
});

loadProducts();
