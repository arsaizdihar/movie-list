window.onload = () => {
  const movies_div = document.querySelector("#movies");
  const API_KEY = "d04742a1e9e55575ea0a3bb3c47a88c5";
  const IMAGE_URL = "https://image.tmdb.org/t/p/w400";

  let movieData;
  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", (e) => {
    const X = e.clientX;
    const Y = e.clientY;
    const { left, top, right, bottom } = document
      .querySelector(".movie-detail")
      .getBoundingClientRect();
    if (left <= X && right >= X && top <= Y && bottom >= Y) {
      return;
    }
    closeModal();
  });

  const closeModal = () => {
    document.body.classList.toggle("overlay-active", false);
    overlay.classList.toggle("hidden", true);
    document.querySelector(".movie-detail").innerHTML = "";
  };

  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      movieData = data.results;
      data.results.forEach((movie) => {
        const container = document.createElement("div");
        container.classList.add("card-container");
        const card = document.createElement("button");
        card.classList.add("card");

        const title = document.createElement("h3");
        title.classList.add("movie-title");
        title.innerText = `${movie.title} (${movie.release_date.slice(0, 4)})`;

        const image = document.createElement("img");
        image.loading = "lazy";
        image.classList.add("poster");
        image.src = IMAGE_URL + movie.backdrop_path;
        image.alt = movie.title;

        const rating = document.createElement("h4");
        rating.classList.add("rating");
        rating.innerText = `${movie.vote_average}`;

        card.innerHTML = title.outerHTML + rating.outerHTML + image.outerHTML;
        container.innerHTML = "<div class='glow'></div>" + card.outerHTML;
        container
          .querySelector(".card")
          .addEventListener("click", () => showDialog(movie.id));

        movies_div.appendChild(container);
      });
    });

  const showDialog = (movieId) => {
    document.body.classList.toggle("overlay-active", true);
    overlay.classList.toggle("hidden", false);
    const movie = movieData.find((m) => m.id === movieId);
    if (movie) {
      document.querySelector(
        ".movie-detail"
      ).innerHTML = `<h2 class="detail-title">${movie.title}</h1>
      <h4 class="rating">${movie.vote_average}</h4>
      <img src="${IMAGE_URL + movie.backdrop_path}" alt="" class="poster">
      <p class="detail-description">${movie.overview}</p>
      <button class="detail-close">CLOSE</button>`;
      document
        .querySelector(".detail-close")
        .addEventListener("click", closeModal);
    }
  };
};
