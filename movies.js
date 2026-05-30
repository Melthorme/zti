const input = document.querySelector('#movieInput');
const btn = document.querySelector('#searchBtn');

const moviesList = document.querySelector('#moviesList');

const title = document.querySelector('#title');
const year = document.querySelector('#year');
const rating = document.querySelector('#rating');
const poster = document.querySelector('#poster');
const plot = document.querySelector('#plot');
const imdbLink = document.querySelector('#imdbLink');

const error = document.querySelector('#error');

// KLUCZ API
const API_KEY = "3fdc6655";


// WYSZUKIWANIE FILMÓW (LISTA)
function searchMovies() {
    const movieName = input.value.trim();

    if (movieName === "") {
        error.textContent = "Wpisz nazwę filmu!";
        return;
    }

    const URL = `https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            moviesList.innerHTML = "";
            error.textContent = "";

            if (data.Response === "False") {
                error.textContent = "Brak wyników";
                return;
            }

            data.Search.forEach(movie => {
                const div = document.createElement('div');

                div.innerHTML = `
                    <img src="${movie.Poster}" class="small-poster">
                    <span>${movie.Title} (${movie.Year})</span>
                `;

                // 🔥 klik → szczegóły
                div.addEventListener('click', () => {
                    getMovieDetails(movie.imdbID);
                });

                moviesList.appendChild(div);
            });
        })
        .catch(() => {
            error.textContent = "Błąd połączenia z API";
        });

    input.value = "";
}


// SZCZEGÓŁY FILMU
function getMovieDetails(id) {
    const URL = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            title.textContent = data.Title;
            year.textContent = "Rok: " + data.Year;
            rating.innerHTML = `⭐ <strong>${data.imdbRating}/10</strong>`;
            poster.src = data.Poster;
            plot.textContent = data.Plot;

            imdbLink.href = `https://www.imdb.com/title/${data.imdbID}/`;
        })
        .catch(() => {
            error.textContent = "Błąd pobierania szczegółów";
        });
}


// EVENTY
btn.addEventListener('click', searchMovies);

input.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        searchMovies();
    }
});