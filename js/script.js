let elSearchForm = $(".js-search-form");
let elSearchInput = $(".js-search-input", elSearchForm);
let elMoviesList = $(".js-movies-list");
let elMovieTemplate = $("#movies-template").content;

movies.splice(100);

let normalizedMovies = movies.map((movie, i) => {
    return {
        id: i + 1,
        title: movie.Title.toString(),
        fulltitle: movie.fulltitle,
        categories: movie.Categories.split("|").join(", "),
        summary: movie.summary,
        imdbRating: movie.imdb_rating,
        runtime: movie.runtime,
        language: movie.language,
        trailer: `https://www.youtube.com/watch?v=${movie.ytid}`,
        smallPoster: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
        bigPoster: `https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`,
    }
})

let movieCategories = [];

normalizedMovies.splice(50).forEach(function(movie) {
    movie.categories.split(", ").forEach(function(category) {
        if (!movieCategories.includes(category)) {
            movieCategories.push(category);
        }
    })
})


let createMovieElement = (movie) => {
    elMoviesList.innerHTML = "";

    let movieElement = elMovieTemplate.cloneNode(true);

    $(".card-title", movieElement).textContent = movie.title;
    $(".card-img-top", movieElement).src = movie.bigPoster;
    $(".card-img-top", movieElement).alt = movie.title;
    $(".card-summary", movieElement).textContent = movie.summary;
    $(".card-genres", movieElement).textContent = movie.genres;
    $(".card-year", movieElement).textContent = movie.year;
    $(".card-language", movieElement).textContent = movie.language;
    $(".card-trailer", movieElement).href = movie.trailer;
    $(".card-runtime", movieElement).href = movie.runtime;

    return movieElement;
}

let renderMovies = (movies) => {
    let elResultFragment = document.createDocumentFragment();

    movies.forEach((movie) => {
        elResultFragment.appendChild(createMovieElement(movie));
    })

    elMoviesList.appendChild(elResultFragment);
}

renderMovies(normalizedMovies);

elSearchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let searchMovie = new RegExp(elSearchInput.value.trim(), "gi");

    let searchResult = normalizedMovies.filter((movie) => {
        if (movie.title.match(searchMovie)) {
            return movie.title.match(searchMovie);
        }
    })

    renderMovies(searchResult);
})