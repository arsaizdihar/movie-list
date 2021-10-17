window.onload = () => {
    const movies_div = document.querySelector("#movies");
    const API_KEY = "d04742a1e9e55575ea0a3bb3c47a88c5";
    const IMAGE_URL = "https://image.tmdb.org/t/p/w400";

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            data.results.forEach((movie) => {
                const card = document.createElement("a");
                card.href = `/movie.html?id=${movie.id}`;
                card.classList.add("card");

                const title = document.createElement("h3");
                title.classList.add("movie-title");
                title.innerText = `${movie.title} (${movie.release_date.slice(
                    0,
                    4
                )})`;

                const image = document.createElement("img");
                image.loading = "lazy";
                image.classList.add("poster");
                image.src = IMAGE_URL + movie.backdrop_path;
                image.alt = movie.title;

                const rating = document.createElement("h4");
                rating.classList.add("rating");
                rating.innerText = `${movie.vote_average} / 10`;

                card.innerHTML =
                    title.outerHTML + rating.outerHTML + image.outerHTML;

                movies_div.appendChild(card);
            });
        });
};
