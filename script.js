const API_KEY = "api_key=5c8d686c99332cd3aa48b5f1560df76e";
const URL = "https://api.themoviedb.org/3";
const API_URL_MOVIES =
  URL + "/discover/movie?primary_release_year=2022&" + API_KEY;
const API_URL_GENRES = URL + "/genre/movie/list?" + API_KEY;
const API_URL_GENRES_CLICK = URL + "/discover/movie?with_genres=";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const API_TRENDING_WEEK = URL + "/trending/movie/week?" + API_KEY;

const main = document.getElementById("main");
const dropdown_menu = document.getElementById("dropdown-menu-id");

async function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
      // console.log(data.results);
    });
}

async function getGenres(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showGenres(data.genres);
      // console.log(data.genres);
    });
}

async function getButtonMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
      // console.log(data.results);
    });
}

async function loadPage(urlMovies, urlGenres) {
  await getMovies(urlMovies);
  await getGenres(urlGenres);
  document.getElementById("trending").addEventListener("click", getTrending);
}

function getTrending() {
  fetch(API_TRENDING_WEEK)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
      // console.log(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = " ";
  data.forEach((movie) => {
    const { title, poster_path, overview } = movie;
    const movieEl = document.createElement("article");
    movieEl.classList.add("card");
    movieEl.innerHTML = `
    <div>
        <img src="${
          IMG_URL + poster_path
        }" class="card-img-top" alt="${title}" />
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            "${overview}"
          </p>
        </div> 
        </div>
        `;

    main.appendChild(movieEl);
  });
}

function showGenres(data) {
  // console.log(data, "genres");
  dropdown_menu.innerHTML = " ";
  data.forEach((genre) => {
    const { name } = genre;
    const genreEl = document.createElement("li");
    genreEl.setAttribute("data-id", genre.id);
    genreEl.classList.add("dropdown-item");
    genreEl.innerHTML = `
    <div><a class="dropdown-item" href="#">${name}</a></div>
    `;
    genreEl.addEventListener("click", (e) => filterGenres(e));
    dropdown_menu.appendChild(genreEl);
  });
}

function filterGenres(e) {
  const genreId = e.target.closest("li").dataset.id;
  const link = API_URL_GENRES_CLICK + genreId + "&" + API_KEY;
  console.log(link);
  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
      // console.log(data.results);
    });
}

function showGenresClick(data) {
  main.innerHTML = " ";
  data.forEach((movie) => {
    const { title, poster_path, overview } = movie;
    const movieEl = document.createElement("article");
    movieEl.classList.add("card");
    movieEl.innerHTML = `
    <div class="card">
        <img src="${
          IMG_URL + poster_path
        }" class="card-img-top" alt="${title}" />
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            "${overview}"
          </p>
        </div> 
        </div>
        `;

    main.appendChild(movieEl);
  });
}

loadPage(API_URL_MOVIES, API_URL_GENRES);
