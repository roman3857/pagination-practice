const newsContainer = document.querySelector(".js-articles-container");
const searchForm = document.querySelector(".js-search-form");
const loadMoreBtn = document.querySelector("[data-action='load-more']");
const spinner = loadMoreBtn.querySelector(".spinne");

const API_KEY = "";
const BASE_URL = "https://newsapi.org/v2";
const options = {
  headers: {
    Authorization: API_KEY,
  },
};
let query = "";
let page = 1;
let totalResult = 0

loadMoreBtn.classList.add("is-hidden");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  query = form.elements.query.value;
  if (query.trim() === "") {
    return alert("Enter valid value");
  }
  page = 1;
  resetMarkup();
  fetchArticles();
  loadMoreBtn.classList.remove("is-hidden");
});

loadMoreBtn.addEventListener("click", () => {
  fetchArticles();
});

function resetMarkup() {
  newsContainer.innerHTML = "";
}

function fetchArticlesData() {
  return fetch(
    `${BASE_URL}/everything?q=${query}&page=${page}&pageSize=12,
    options,`
  ).then((resp) => resp.json());
}

function fetchArticles() {
  loadMoreBtn.disabled = true;
  spinner.classList.remove("is-hidden");
  fetchArticlesData()
    .then((data) => {
      renderMarkup(data.articles);
      page += 1;
      spinner.classList.add("is-hidden");
      loadMoreBtn.disabled = false;
    })
    .catch((error) => console.log(error));
}

function renderMarkup(data) {
  const markup = data
    .map((article) => {
      return `      <li>
        <a href="${article.url}" target="_blank" rel="noopener noreferrer">
          <article>
            <img src="${article.urlToImage}" alt=" width="480" />
            <h2>${article.title}</h2>
            <p>Posted by: ${article.author}</p>
            <p>${article.description}</p>
          </article>
        </a>
      </li>`;
    })
    .join("");
  newsContainer.insertAdjacentHTML("beforeend", markup);
}

function renderPagination() { 
    const totalPage = Math.ceil(totalResult / 12)
    
    let markup = ""

    if (totalPage <= 1) {
        return
    }
    markup = +`
<button data-page="${page - 1}">previos</button/>`



}