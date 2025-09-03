const TMDB_API_KEY = "3caec7b8e82c93c4f3f5a27a02877e33";
const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


let activeMovieId = null;
const LS_KEY = "cinescore_reviews_simple";
let movieCache = {};   //to store fetched movies
let genres = {};


async function init() {
    try {
        await fetchGenres();
        await fetchAndRenderAllRows();
        await fetchAndSetHeroTrailer();
    } catch (error) {
        console.error("Initialization error:", error);
    }
}

//fetch and set herovideo
async function fetchAndSetHeroTrailer() {
    try {
        const popularMoviesUrl = `${TMDB_BASE_URL}movie/popular?api_key=${TMDB_API_KEY}`;
        const popularMoviesRes = await fetch(popularMoviesUrl);
        const popularMoviesData = await popularMoviesRes.json();
        
        if (popularMoviesData.results && popularMoviesData.results.length > 0) {
            const featuredMovieId = popularMoviesData.results[1].id; // Use the first popular movie
            const videosUrl = `${TMDB_BASE_URL}movie/${featuredMovieId}/videos?api_key=${TMDB_API_KEY}`;
            const videosRes = await fetch(videosUrl);
            const videosData = await videosRes.json();

            const trailer = videosData.results.find(
                (video) => video.site === "YouTube" && video.type === "Trailer"
            );

            if (trailer) {
                const heroVideoIframe = document.getElementById("heroVideo");
                const trailerUrl = `https://www.youtube.com/embed/${trailer.key}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${trailer.key}`;
                heroVideoIframe.src = trailerUrl;
            } else {
                console.log("No trailer found for the featured movie.");
            }
        }
    } catch (error) {
        console.error("Error fetching hero trailer:", error);
    }
}

//fetching genres
async function fetchGenres() {
    const url = `${TMDB_BASE_URL}genre/movie/list?api_key=${TMDB_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();    //parse data
    data.genres.forEach(g => genres[g.id] = g.name);
}

//To fetch list of movies from category
async function fetchMovies (endpoint, category) {
    try{
        const url = `${TMDB_BASE_URL}movie/${endpoint}?api_key=${TMDB_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error (`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const movies = data.results.map(movie =>({
            id: movie.id,
            title: movie.title,
            year: movie.release_date ? movie.release_date.substring(0, 4) : 'N/A',
            genre: movie.genre_ids.map(id => genres[id] || 'N/A').join(', '),
            plot: movie.overview,
            poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750',
            cat: category
        }));
        movieCache[category]= movies;
        return movies;
    }catch (error) {
        console.error(`Error fetching movies for ${category}:`, error);
        return [];
    }
}

//Rendering movie rows based on category
function renderRows(list = []) {
    const allCategories = ["now playing on bingebox", "original", "top-rated", "boredom busters", "trending", "popular"];

//clear all rows first
allCategories.forEach(cat => {
    const rail = document.getElementById(`rail-${cat}`);
    if (rail) rail.innerHTML = "";
});

//populate with data from cache or filtered list
allCategories.forEach(cat => {
    const rail = document.getElementById(`rail-${cat}`);
    if (!rail) return;

    const moviesToRender = list.length ? list.filter(m => m.cat ===cat) : movieCache[cat];
    if (!moviesToRender) return;

    moviesToRender.forEach(m => {
        const div = document.createElement("div");
        div.className ="poster";
        div.dataset.id =m.id;
        div.innerHTML = `
              <img src="${m.poster}" alt="${m.title}">
              <span class="badge">⭐ ${avgRating(m.id)}</span>
              <div class="overlay"><div class="title">${m.title}</div></div>`;
              div.addEventListener ("click", () => openDetails(m.id, m));
              rail.appendChild(div);
    });
});
}

async function fetchAndRenderAllRows() {
    const categories = {
        "now playing on bingebox": "now_playing",
        "original": "popular",
        "top-rated": "top_rated",
        "boredom busters": "popular",
        "trending": "popular",
        "popular": "popular"
    };
    const fetchPromises = Object.keys(categories).map(cat => fetchMovies(categories[cat], cat));
    await Promise.all(fetchPromises);
    renderRows();
}

//Modal Details
async function openDetails(id) {
    let movie = null;
    for (const cat in movieCache) {
        movie = movieCache[cat].find(x => x.id === id);
        if (movie) break;
    }
    
    // Fallback to fetching details if not in cache
    if (!movie) {
        try {
            const res = await fetch(`${TMDB_BASE_URL}movie/${id}?api_key=${TMDB_API_KEY}`);
            const detail = await res.json();
            movie = {
                id: detail.id,
                title: detail.title,
                year: detail.release_date ? detail.release_date.substring(0, 4) : 'N/A',
                genre: detail.genres.map(g => g.name).join(', '),
                plot: detail.overview,
                poster: detail.poster_path ? `${TMDB_IMAGE_BASE_URL}${detail.poster_path}` : 'https://via.placeholder.com/500x750'
            };
        } catch (error) {
            console.error("Error fetching movie details:", error);
            return;
        }
    }

    activeMovieId = movie.id;
    document.getElementById("detailsTitle").textContent = movie.title;
    document.getElementById("detailsYear").textContent = movie.year;
    document.getElementById("detailsGenre").textContent = movie.genre;
    document.getElementById("detailsPlot").textContent = movie.plot;

    // Fetch trailer and update iframe source
    const detailsTrailer = document.getElementById("detailsTrailer");
    detailsTrailer.src = ""; // Clear existing video

    try {
        const videosUrl = `${TMDB_BASE_URL}movie/${id}/videos?api_key=${TMDB_API_KEY}`;
        const videosRes = await fetch(videosUrl);
        const videosData = await videosRes.json();
        
        const trailer = videosData.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        
        if (trailer) {
            const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
            detailsTrailer.src = trailerUrl;
        } else {
            console.log("No trailer found for this movie.");
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
    }
    
    renderReviews();
    new bootstrap.Modal(document.getElementById("detailsModal")).show();
}

//Local storage reviews
function getReviews() {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
}
function saveReviews(map) {
    localStorage.setItem(LS_KEY, JSON.stringify(map));
}
function reviewsFor(id) {
    return getReviews()[id] || [];
}
function addReview(id, r) {
    const map = getReviews();
    map[id] = [...(map[id] || []), r];
    saveReviews(map);
}
function avgRating(id) {
    const r = reviewsFor(id);
    if (!r.length) return 0;
    return (r.reduce((s, x) => s + x.rating, 0) / r.length).toFixed(1);
}

function renderReviews() {
    const list = document.getElementById("reviewsList");
    const revs = reviewsFor(activeMovieId);
    document.getElementById("detailsAvg").textContent = avgRating(activeMovieId);
    document.getElementById("detailsCount").textContent = revs.length;
    list.innerHTML = revs.length
      ? revs.map(r => `<li class="list-group-item">
          <b>${r.name}</b> ⭐${r.rating}<br>${r.text}
          </li>`).join("")
      : `<li class="list-group-item">No reviews yet.</li>`;
}

//Review Form
document.getElementById("reviewForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("revName").value.trim();
    const email = document.getElementById("revEmail").value.trim();
    const text = document.getElementById("revText").value.trim();
    const rating = document.getElementById("revStars").dataset.selected || "";

    if (!name || name.length < 2 || name.length > 30) {
        alert("Please enter a valid name (2–30 letters).");
        return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert("Please enter a valid email.");
        return;
    }
    if (!text || text.length < 2) {
        alert("Review must be at least 2 characters.");
        return;
    }
    if (!rating) {
        alert("Please pick a star rating.");
        return;
    }

    addReview(activeMovieId, { name, email, rating: parseInt(rating), text });
    renderReviews();
    this.reset();
    document.getElementById("revStars").dataset.selected = "";
    makeStars();
});

//Star Rating
function makeStars() {
    const c = document.getElementById("revStars");
    c.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        const s = document.createElement("i");
        s.className = "far fa-star";
        s.dataset.value = i;
        s.style.cursor = "pointer";

        s.addEventListener("mouseover", () => {
            [...c.children].forEach(st => {
                st.className = parseInt(st.dataset.value) <= i ? "fa fa-star" : "far fa-star";
            });
        });

        s.addEventListener("click", () => {
            c.dataset.selected = i;
            [...c.children].forEach(st => {
                st.className = parseInt(st.dataset.value) <= i ? "fa fa-star selected" : "far fa-star";
            });
        });

        s.addEventListener("mouseout", () => {
            const selected = parseInt(c.dataset.selected || 0);
            [...c.children].forEach(st => {
                st.className = parseInt(st.dataset.value) <= selected ? "fa fa-star selected" : "far fa-star";
            });
        });

        c.appendChild(s);
    }
}
makeStars();

//Search uko juu
document.getElementById("searchForm").addEventListener("submit", async e => {
    e.preventDefault();
    const q = document.getElementById("searchInput").value.trim();
    const movieColumn = document.querySelector(".movie-column");

    if (!q) {
        movieColumn.querySelector("main").style.display = "block";
        const searchSection = document.getElementById("searchSection");
        if (searchSection) searchSection.remove();
        renderRows();
        return;
    }

    try {
        const res = await fetch(`${TMDB_BASE_URL}search/movie?query=${encodeURIComponent(q)}&api_key=${TMDB_API_KEY}`);
        const data = await res.json();

        movieColumn.querySelector("main").style.display = "none";
        let searchSection = document.getElementById("searchSection");
        if (searchSection) searchSection.remove();
        searchSection = document.createElement("div");
        searchSection.id = "searchSection";
        searchSection.className = "container-fluid screen";

        const rowTitle = document.createElement("div");
        rowTitle.className = "d-flex justify-content-between align-items-center mt-3";
        rowTitle.innerHTML = `<div class="row-title">Search Results for "${q}"</div>`;
        searchSection.appendChild(rowTitle);

        const rail = document.createElement("div");
        rail.className = "rail";
        searchSection.appendChild(rail);

        if (data.results && data.results.length > 0) {
            data.results.forEach(m => {
                const div = document.createElement("div");
                div.className = "poster";
                div.dataset.id = m.id;
                div.innerHTML = `
                  <img src="${m.poster_path ? `${TMDB_IMAGE_BASE_URL}${m.poster_path}` : 'https://via.placeholder.com/500x750'}" alt="${m.title}">
                  <div class="overlay"><div class="title">${m.title}</div></div>
                `;
                div.addEventListener("click", () => openDetails(m.id));
                rail.appendChild(div);
            });
        } else {
            rail.innerHTML = `<p class="text-muted">No results found for "${q}".</p>`;
        }
        movieColumn.appendChild(searchSection);
    } catch (err) {
        console.error("Search error:", err);
    }
});

//Sort
document.querySelectorAll(".sort-option").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.sort;
        let allMovies = Object.values(movieCache).flat();
        let sortedMovies = [...allMovies];

        if (type === "title") {
            sortedMovies.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        } else if (type === "year") {
            sortedMovies.sort((a, b) => (b.year || 0) - (a.year || 0));
        } else if (type === "genre") {
            sortedMovies.sort((a, b) => (a.genre || "").localeCompare(b.genre || ""));
        }
        renderRows(sortedMovies);
    });
});

// Filtering by genre
document.querySelectorAll(".genre-option").forEach(btn => {
    btn.addEventListener("click", () => {
        const genreName = btn.dataset.genre;
        const allMovies = Object.values(movieCache).flat();
        const filteredMovies = allMovies.filter(m => m.genre && m.genre.includes(genreName));
        renderRows(filteredMovies);
    });
});

// Reset filter
document.querySelector(".reset-option").addEventListener("click", () => {
    renderRows(); // Renders from the cache
});

// Toggle theme (light/dark)
document.getElementById("themeToggle").addEventListener("change", e => {
    document.body.classList.toggle("light", e.target.checked);
});

// Hero more info
document.getElementById("heroInfo").addEventListener("click", () => {
    const featuredMovie = movieCache["popular"] && movieCache["popular"][1];
    if (featuredMovie) openDetails(featuredMovie.id);
});

// scroll controls
document.querySelectorAll(".pager button").forEach(btn => {
    btn.addEventListener("click", () => {
        const cat = btn.closest(".pager").dataset.cat;
        const rail = document.getElementById(`rail-${cat}`);
        const card = rail.querySelector(".poster");
        if (!rail || !card) return;

        const cardWidth = card.offsetWidth + 16;
        const direction = btn.dataset.page === "next" ? 1 : -1;

        rail.scrollBy({
            left: cardWidth * direction,
            behavior: "smooth"
        });
    });
});

// Mute button
let player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("heroVideo", {
      events: {
        onReady: (event) => {
          event.target.mute(); // start muted
          event.target.playVideo();
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const muteBtn = document.getElementById("muteBtn");
    const video = document.getElementById("hero-video"); // or audio element

    muteBtn.addEventListener("click", () => {
        if (video.muted) {
            video.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
});

init(); // Call initialize function to start fetching data