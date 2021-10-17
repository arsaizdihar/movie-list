window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const movieId = urlParams.get("id");

    if (movieId === null) {
        return;
    }
};
