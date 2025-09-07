const TMDB_API_KEY = "3caec7b8e82c93c4f3f5a27a02877e33";
const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

let player;
let activeMovieId = null;
const LS_KEY = "cinescore_reviews_simple";
const WISHLIST_KEY = "cinescore_wishlist";
let movieCache = {};
let genres = {};

function getAllMovies() {
  return Object.values(movieCache).flat();
}


//ADD TO MY WISHLIST
function getWishlist() {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
}

function saveWishlist(list) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

function isInWishlist(id) {
  return getWishlist().some(movie => movie.id === id);
}

function addToWishlist(movie) {
  const list = getWishlist();
  if (!list.some(m => m.id === movie.id)) {
    list.push(movie);
    saveWishlist(list);
  }
}

function removeFromWishlist(id) {
  const list = getWishlist().filter(m => m.id !== id);
  saveWishlist(list);
}

function toggleWishlist(movie) {
  if (isInWishlist(movie.id)) {
    removeFromWishlist(movie.id);
  } else {
    addToWishlist(movie);
  }
  updateWishlistButton(movie.id);
  if (window.location.pathname.includes("my-list.html")) {
    renderMyList();
  }
}

function updateWishlistButton(id) {
  const btn = document.getElementById("addToWishlistBtn");
  if (!btn) return;
  btn.innerHTML = isInWishlist(id)
    ? `<i class="fa fa-heart"></i> Remove from My List`
    : `<i class="fa fa-heart"></i> Add to Wishlist`;
}


//INIT
async function init() {
    try {
        await fetchGenres();
        await fetchAndRenderAllRows();
        if (window.location.pathname.includes("my-list.html")) {
            renderMyList();
        }
    } catch (error) {
        console.error("Initialization error:", error);
    }
}

//HERO VIDEO FROM YOUTUBE
function onYouTubeIframeAPIReady() {
    player = new YT.Player("heroVideo", {
        videoId: "LKFuXETZUsI",
        playerVars: { autoplay: 1, mute: 1, controls: 0, loop: 1, playlist: "LKFuXETZUsI", modestbranding: 1, showinfo: 0, rel: 0 },
        events: { onReady: onPlayerReady }
    });
}

function onPlayerReady() {
    const muteBtn = document.getElementById("muteBtn");
    if (!muteBtn) return;
    muteBtn.addEventListener("click", () => {
        if (player.isMuted()) {
            player.unMute();
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            player.mute();
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
}

//FETHING GENRES
async function fetchGenres() {
    try {
        const movieRes = await fetch(`${TMDB_BASE_URL}genre/movie/list?api_key=${TMDB_API_KEY}`);
        const movieData = await movieRes.json();
        const tvRes = await fetch(`${TMDB_BASE_URL}genre/tv/list?api_key=${TMDB_API_KEY}`);
        const tvData = await tvRes.json();
        [...movieData.genres, ...tvData.genres].forEach(g => { genres[g.id] = g.name; });
    } catch (err) {
        console.error("Error fetching genres:", err);
    }
}

//FETCHING MOVIES/SERIES
async function fetchMovies(endpoint, category) {
    try {
        const url = `${TMDB_BASE_URL}movie/${endpoint}?api_key=${TMDB_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const movies = data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            year: movie.release_date ? movie.release_date.substring(0, 4) : 'N/A',
            genre: movie.genre_ids.map(id => genres[id] || 'N/A').join(', '),
            plot: movie.overview,
            poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750',
            cat: category,
            type: "movie",
            rating: movie.vote_average || 0
        }));
        movieCache[category] = movies;
        return movies;
    } catch (error) {
        console.error(`Error fetching movies for ${category}:`, error);
        return [];
    }
}

async function fetchTvShows(endpoint, category) {
    try {
        const url = `${TMDB_BASE_URL}tv/${endpoint}?api_key=${TMDB_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const shows = data.results.map(show => ({
            id: show.id,
            title: show.name,
            year: show.first_air_date ? show.first_air_date.substring(0, 4) : "N/A",
            genre: show.genre_ids.map(id => genres[id] || "N/A").join(", "),
            plot: show.overview,
            poster: show.poster_path ? `${TMDB_IMAGE_BASE_URL}${show.poster_path}` : "https://via.placeholder.com/500x750",
            cat: category,
            type: "tv",rating: show.vote_average || 0
        }));
        movieCache[category] = shows;
        return shows;
    } catch (error) {
        console.error(`Error fetching TV shows for ${category}:`, error);
        return [];
    }
}

//RENDER ROWS
function renderRows(list = []) {
    const allCategories = ["now-playing-on-bingebox", "original", "top-rated", "boredom-busters", "trending", "popular"];
    allCategories.forEach(cat => { 
        const rail = document.getElementById(`rail-${cat}`); 
        if (rail) rail.innerHTML = ""; 
    });

    allCategories.forEach(cat => {
        const section = document.getElementById(`section-${cat}`);
        const rail = document.getElementById(`rail-${cat}`);
        if (!rail) return;
        const moviesToRender = list.length ? list.filter(m => m.cat === cat) : movieCache[cat];
        if (!moviesToRender || moviesToRender.length === 0) { if (section) section.style.display = "none"; return; }
        if (section) section.style.display = "block";
        rail.innerHTML = "";
        moviesToRender.forEach(m => {
            const div = document.createElement("div");
            div.className = "poster";
            div.dataset.id = m.id;
            div.innerHTML = `<img src="${m.poster}" alt="${m.title}"><span class="badge">⭐ ${avgRating(m.id)}</span><div class="overlay"><div class="title">${m.title}</div></div>`;
            div.addEventListener("click", () => openDetails(m.id));
            rail.appendChild(div);
        });
    });
}

//FETCH & RENDER ALL ROWS
async function fetchAndRenderAllRows() {
    const categories = {
        "now-playing-on-bingebox": { endpoint: "now_playing", type: "movie" },
        "original": { endpoint: "popular", type: "movie" },
        "top-rated": { endpoint: "top_rated", type: "movie" },
        "boredom-busters": { endpoint: "airing_today", type: "tv" },
        "trending": { endpoint: "popular", type: "tv" },
        "popular": { endpoint: "top_rated", type: "tv" }
    };
    const fetchPromises = Object.keys(categories).map(cat => {
        const { endpoint, type } = categories[cat];
        return type === "movie" ? fetchMovies(endpoint, cat) : fetchTvShows(endpoint, cat);
    });
    await Promise.all(fetchPromises);
    renderRows();
}

//MODAL DETAILS
async function openDetails(id, type = "movie") {
  let movie = null;

  
  for (const cat in movieCache) {
    movie = movieCache[cat].find(x => x.id === id);
    if (movie) {
      type = movie.type; 
      break;
    }
  }

  //Fetch details from TMDB if not in cache
  if (!movie) {
    try {
      const endpoint = type === "tv" ? "tv" : "movie"; 
      const res = await fetch(`${TMDB_BASE_URL}${endpoint}/${id}?api_key=${TMDB_API_KEY}`);
      const detail = await res.json();

      movie = {
        id: detail.id,
        title: detail.title || detail.name,
        year: detail.release_date?.substring(0,4) || detail.first_air_date?.substring(0,4) || "N/A",
        genre: detail.genres?.map(g => g.name).join(", ") || "N/A",
        plot: detail.overview || "No description available.",
        poster: detail.poster_path
          ? `${TMDB_IMAGE_BASE_URL}${detail.poster_path}`
          : "https://via.placeholder.com/500x750",
        type: endpoint,  //"movie" or "tv"
        rating: detail.vote_average || 0,
        cat: "wishlist"
      };
    } catch (error) {
      console.error("Error fetching details:", error);
      return;
    }
  }

  //Filling modal details
  activeMovieId = movie.id;
  document.getElementById("detailsTitle").textContent = movie.title;
  document.getElementById("detailsYear").textContent = movie.year;
  document.getElementById("detailsGenre").textContent = movie.genre;
  document.getElementById("detailsPlot").textContent = movie.plot;

  //fetching a trailer
  const detailsTrailer = document.getElementById("detailsTrailer");
  detailsTrailer.src = "";
  try {
    const endpoint = movie.type === "tv" ? "tv" : "movie";
    const videosUrl = `${TMDB_BASE_URL}${endpoint}/${id}/videos?api_key=${TMDB_API_KEY}`;
    const videosRes = await fetch(videosUrl);
    const videosData = await videosRes.json();
    const trailer = videosData.results.find(
      v => v.site === "YouTube" && v.type === "Trailer"
    );
    if (trailer) detailsTrailer.src = `https://www.youtube.com/embed/${trailer.key}`;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }

  renderReviews();

  //Wishlist button
  const wishlistBtn = document.getElementById("addToWishlistBtn");
  wishlistBtn.onclick = () => toggleWishlist(movie);
  updateWishlistButton(movie.id);

  //Show modal
  new bootstrap.Modal(document.getElementById("detailsModal")).show();
}



//REVIEWS
function getReviews() { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); }
function saveReviews(map) { localStorage.setItem(LS_KEY, JSON.stringify(map)); }
function reviewsFor(id) { return getReviews()[id] || []; }
function addReview(id, r) { const map = getReviews(); map[id] = [...(map[id] || []), r]; saveReviews(map); }
function avgRating(id) { const r = reviewsFor(id); if (!r.length) return 0; return (r.reduce((s, x) => s + x.rating, 0) / r.length).toFixed(1); }
function renderReviews() {
    const list = document.getElementById("reviewsList");
    if (!list) return;
    const revs = reviewsFor(activeMovieId);
    document.getElementById("detailsAvg").textContent = avgRating(activeMovieId);
    document.getElementById("detailsCount").textContent = revs.length;
    list.innerHTML = revs.length ? revs.map(r => `<li class="list-group-item"><b>${r.name}</b> ⭐${r.rating}<br>${r.text}</li>`).join("") : `<li class="list-group-item">No reviews yet.</li>`;
}

//Review Form
document.getElementById("reviewForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("revName").value.trim();
    const email = document.getElementById("revEmail").value.trim();
    const text = document.getElementById("revText").value.trim();
    const rating = document.getElementById("revStars").dataset.selected || "";
    if (!name || name.length < 2 || name.length > 30) { alert("Please enter a valid name (2–30 letters)."); return; }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { alert("Please enter a valid email."); return; }
    if (!text || text.length < 2) { alert("Review must be at least 2 characters."); return; }
    if (!rating) { alert("Please pick a star rating."); return; }
    addReview(activeMovieId, { name, email, rating: parseInt(rating), text });
    renderReviews();
    this.reset();
    document.getElementById("revStars").dataset.selected = "";
    makeStars();
});

//STAR RATING
function makeStars() {
    const c = document.getElementById("revStars");
    if (!c) return;
    c.innerHTML = "";
    for (let i=1;i<=5;i++){
        const s = document.createElement("i");
        s.className = "far fa-star";
        s.dataset.value=i;
        s.style.cursor="pointer";
        s.addEventListener("mouseover",()=>{[...c.children].forEach(st=>st.className=parseInt(st.dataset.value)<=i?"fa fa-star":"far fa-star");});
        s.addEventListener("click",()=>{c.dataset.selected=i;[...c.children].forEach(st=>st.className=parseInt(st.dataset.value)<=i?"fa fa-star selected":"far fa-star");});
        s.addEventListener("mouseout",()=>{const selected=parseInt(c.dataset.selected||0);[...c.children].forEach(st=>st.className=parseInt(st.dataset.value)<=selected?"fa fa-star selected":"far fa-star");});
        c.appendChild(s);
    }
}
makeStars();

//SEARCH (fetches from TMDb API)
document.getElementById("searchForm")?.addEventListener("submit", async e=>{
    e.preventDefault();
    const q=document.getElementById("searchInput").value.trim();
    const movieColumn=document.querySelector(".movie-column");

    if(!q){
        movieColumn.querySelector("main").style.display="block";
        const searchSection=document.getElementById("searchSection");
        if(searchSection) searchSection.remove();
        renderRows();
        return;
    }

    try{
        const res=await fetch(`${TMDB_BASE_URL}search/movie?query=${encodeURIComponent(q)}&api_key=${TMDB_API_KEY}`);
        const data=await res.json();

        movieColumn.querySelector("main").style.display="none";
        let searchSection=document.getElementById("searchSection");
        if(searchSection) searchSection.remove();
        searchSection=document.createElement("div");
        searchSection.id="searchSection";
        searchSection.className="container-fluid screen";

        const rowTitle=document.createElement("div");
        rowTitle.className="d-flex justify-content-between align-items-center mt-3";
        rowTitle.innerHTML=`<div class="row-title">Search Results for "${q}"</div>`;
        searchSection.appendChild(rowTitle);

        const rail=document.createElement("div");
        rail.className="rail";
        searchSection.appendChild(rail);

        if(data.results && data.results.length){
            data.results.forEach(m=>{
                const div=document.createElement("div");
                div.className="poster";
                div.dataset.id=m.id;
                div.innerHTML=`<img src="${m.poster_path?TMDB_IMAGE_BASE_URL+m.poster_path:'https://via.placeholder.com/500x750'}" alt="${m.title}"><div class="overlay"><div class="title">${m.title}</div></div>`;
                div.addEventListener("click",()=>openDetails(m.id));
                rail.appendChild(div);
            });
        }else{
            rail.innerHTML="<p>No results found.</p>";
        }
        movieColumn.appendChild(searchSection);

    }catch(err){console.error(err);}
});

//SORTING
function sortMovies(criteria) {
  let sorted = [...getAllMovies()];

  switch (criteria) {
    case "title":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "year":
      sorted.sort((a, b) => parseInt(b.year || 0) - parseInt(a.year || 0));
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  renderRows(sorted);
}


//Sort by type
function filterByType(type) {
  let filtered = getAllMovies().filter(m => m.type === type);
  renderRows(filtered);
}

// Sort by Genre
function filterByGenre(genreName) {
  let filtered = getAllMovies().filter(m =>
    m.genre.toLowerCase().includes(genreName.toLowerCase())
  );
  renderRows(filtered);
}

// Reset Filter
function resetFilters() {
  renderRows(getAllMovies());
}


document.querySelectorAll(".sort-option").forEach(el => {
  el.addEventListener("click", function () {
    let criteria = this.getAttribute("data-sort");
    sortMovies(criteria);
  });
});

document.querySelectorAll(".type-option").forEach(el => {
  el.addEventListener("click", function () {
    let type = this.getAttribute("data-type");
    filterByType(type);
  });
});

document.querySelectorAll(".genre-option").forEach(el => {
  el.addEventListener("click", function () {
    let genre = this.getAttribute("data-genre");
    filterByGenre(genre);
  });
});

document.querySelector(".reset-option").addEventListener("click", resetFilters);



// dark/light theme
document.getElementById("themeToggle")?.addEventListener("change", function(){
    document.body.classList.toggle("light", this.checked);
});

// My list page
function renderMyList() {
  const listContainer = document.querySelector(".movie-column");
  if (!listContainer) return;

  listContainer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mt-3 mb-3">
      <h2>My List</h2>
      <button id="clearWishlist" class="btn btn-danger btn-sm">
        Clear My List
      </button>
    </div>
  `;

  const wishlist = getWishlist();

  if (!wishlist.length) {
    listContainer.innerHTML += "<p>Your list is empty.</p>";
    return;
  }

  const row = document.createElement("div");
  row.className = "row g-3"; 
  listContainer.appendChild(row);

  wishlist.forEach(movie => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-2"; // 6 items per row
    

    col.innerHTML = `
      <div class="poster" data-id="${movie.id}">
        <img src="${movie.poster}" alt="${movie.title}" class="img-fluid rounded shadow-sm">
        <span class="badge bg-dark position-absolute top-0 end-0 m-1">⭐ ${avgRating(movie.id)}</span>
        <div class="overlay">
          <div class="title">${movie.title}</div>
        </div>
      </div>
    `;

    col.querySelector(".poster").addEventListener("click", () => openDetails(movie.id, movie.type));
    row.appendChild(col);
  });

  // Clear btn
  document.getElementById("clearWishlist").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your list?")) {
      saveWishlist([]); // clear localStorage
      renderMyList();   
    }
  });
}

// initializing
init();
