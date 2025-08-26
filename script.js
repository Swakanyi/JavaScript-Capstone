//Sample movies
    const sampleMovies = [
      {id:'tt10872600', title:'Spider‑Man: No Way Home', year:2021, genre:'Action', cat:'original', plot:'Peter Parker seeks help after his identity is revealed.', poster:'3f360f69-369b-41a1-8183-c32a50804149.jpeg'},
      {id:'tt4574334', title:'Stranger Things', year:2016, genre:'Sci‑Fi', cat:'original', plot:'A group of kids face supernatural mysteries in their town.', poster:'Stranger Things season 1 poster.jpeg'},
      {id: 'tt3521164',title: 'Moana',year: 2016,  genre: 'Animation, Adventure, Family', cat: 'original',plot: 'An adventurous teenager sets sail on a daring mission to save her people, joined by the demigod Maui.',poster: 'Moan poster.jpeg'},
      {id:'tt10648342', title:'Thor: Love and Thunder', year:2022, genre:'Action', cat:'original', plot:'Thor embarks on a journey unlike anything he has ever faced.', poster:'8b7e2256-3e1c-4ee2-a739-01ffa8cf4ff6.jpeg'},
      {id:'tt4154796', title:'Avengers: Endgame', year:2019, genre:'Action', cat:'original', plot:'The Avengers assemble once more to undo Thanos’ snap.', poster:'avengers.jpeg'},
      {id:'tt0183869', title:'Taxi', year:1998, genre:'Action', cat:'original', plot:'To work off his tarnished driving record, a policeman teams up with a fast-talking cab driver to chase down a gang of bank robbers.', poster:'Movie_ Taxi.jpeg'},
      {id:'tt0118615', title:'Anaconda', year:1997, genre:'Adventure', cat:'original', plot:'A documentary film crew is hunted by a giant anaconda while searching for a lost tribe in the Amazon rainforest.', poster:'Anaconda.jpeg'},
      {Title:"White House Down", Year:"2013", Genre:"Action", cat:"original", plot:"While on a tour of the White House with his young daughter, a policeman springs into action to save his child and protect the president from a heavily armed group of dangerous terrorists.", poster:"white house.jpeg"},
      
      {id:'tt14452776', title:'Man vs Bee', year:2022, genre:'Comedy', cat:'trending', plot:'A house sitter and a bee go to war.', poster:'Man Vs Bee.jpeg'},
      {id:'tt1467304', title:'Matilda the Musical', year:2022, genre:'Family', cat:'trending', plot:'An extraordinary girl stands up to her overbearing parents.', poster:'8cf0e530-4bf2-4129-8737-278902bdf9b2.jpeg'},
      {id:'tt10249164', title:'Daddy Day Camp', year:2007, genre:'Comedy', cat:'trending', plot:'Two dads take over a summer day camp.', poster:'4871e0f5-d1a8-4d89-a57c-97553176c4a5.jpeg'},
      {id:'tt0468569', title:'The Dark Knight', year:2008, genre:'Action', cat:'trending', plot:'Batman faces the Joker in a battle for Gotham City.', poster:'Movie Poster.jpeg'},
      {Title:"Fall for me", Year:"2025", Genre:"Thriller",cat: "trending", plot:"Lilli visits her sister Valeria, surprised to learn she's engaged to a Frenchman, Manu. She spontaneously meets nightclub manager Tom, sparking an instant connection. A dark secret lurks behind the island's events.", poster: "Fall for me.jpg"},

      {id:'tt6723592', title:'Tenet', year:2020, genre:'Action', cat:'popular', plot:'A secret agent manipulates time to prevent World War III.', poster:'Tenet 2020 Poster.jpeg'},
      {id:'tt6722802', title:'The Adam Project', year:2022, genre:'Adventure', cat:'popular', plot:'A time-traveling pilot teams up with his younger self.', poster:'The Adam Project.jpeg'},
      {id:'tt9288822', title:'FARZI', year:2023, genre:'Crime', cat:'popular', plot:'A talented artist gets pulled into the world of counterfeiting.', poster:'979026ee-223a-4e5b-afae-5ac2fd5e2c62.jpeg'},
      {id:'tt1375666', title:'Inception', year:2010, genre:'Sci-Fi', cat:'popular', plot:'A thief enters dreams to steal secrets but faces a deeper mission.', poster:'incept.jpeg'}
    ];


const movies = [...sampleMovies];
let activeMovieId = null;
const LS_KEY = "cinescore_reviews_simple";

//Local storage (reviews)
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

//Rendering Rows
function renderRows() {
  ["original", "trending", "popular"].forEach(cat => {
    const rail = document.getElementById(`rail-${cat}`);
    rail.innerHTML = "";
    movies.filter(m => m.cat === cat).forEach(m => {
      const div = document.createElement("div");
      div.className = "poster";
      div.dataset.id = m.id;
      div.innerHTML = `
        <img src="${m.poster}" alt="${m.title}">
        <span class="badge">⭐ ${avgRating(m.id)}</span>
        <div class="overlay"><div class="title">${m.title}</div></div>
      `;
      div.addEventListener("click", () => openDetails(m.id));
      rail.appendChild(div);
    });
  });
}

//Modal Details
function openDetails(id) {
  const m = movies.find(x => x.id === id);
  if (!m) return;
  activeMovieId = id;
  document.getElementById("detailsTitle").textContent = m.title;
  document.getElementById("detailsPoster").src = m.poster;
  document.getElementById("detailsYear").textContent = m.year;
  document.getElementById("detailsGenre").textContent = m.genre;
  document.getElementById("detailsPlot").textContent = m.plot;
  renderReviews();
  new bootstrap.Modal(document.getElementById("detailsModal")).show();
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

  // Simple validation
  if (!name || name.length < 2 || name.length > 30) {
    alert("Please enter a valid name (2–30 letters).");
    return;
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert("Please enter a valid email.");
    return;
  }
  if (!text || text.length < 10) {
    alert("Review must be at least 10 characters.");
    return;
  }
  if (!rating) {
    alert("Please pick a star rating.");
    return;
  }

  // Add review
  if (reviewsList.querySelector(".text-muted")) {
    reviewsList.innerHTML = ""; 
  }

  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `<strong>${name}</strong> (${email})<br>
    Rating: ${"★".repeat(rating)}${"☆".repeat(5 - rating)}<br>
    ${text}`;
  reviewsList.appendChild(li);

  // Reset form
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

    // Hover effect
    s.addEventListener("mouseover", () => {
      [...c.children].forEach(st => {
        st.className =
          parseInt(st.dataset.value) <= i ? "fa fa-star" : "far fa-star";
      });
    });

    // rate
    s.addEventListener("click", () => {
      c.dataset.selected = i;
      [...c.children].forEach(st => {
        st.className =
          parseInt(st.dataset.value) <= i ? "fa fa-star selected" : "far fa-star";
      });
    });

    // Reset stars 
    s.addEventListener("mouseout", () => {
      const selected = parseInt(c.dataset.selected || 0);
      [...c.children].forEach(st => {
        st.className =
          parseInt(st.dataset.value) <= selected ? "fa fa-star selected" : "far fa-star";
      });
    });

    c.appendChild(s);
  }
}

makeStars();

function checkEmptyReviews() {
  const reviewsList = document.getElementById("reviewsList");
  if (!reviewsList.children.length) {
    reviewsList.innerHTML = `<li class="list-group-item text-muted">No reviews yet.</li>`;
  }
}
checkEmptyReviews();

// Search
document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(q));
  ["original", "trending", "popular"].forEach(cat => {
    const rail = document.getElementById(`rail-${cat}`);
    rail.innerHTML = "";
    filtered.filter(m => m.cat === cat).forEach(m => {
      const div = document.createElement("div");
      div.className = "poster";
      div.dataset.id = m.id;
      div.innerHTML = `<img src="${m.poster}"><div>${m.title}</div>`;
      div.addEventListener("click", () => openDetails(m.id));
      rail.appendChild(div);
    });
  });
});


// Sort
document.querySelectorAll(".sort-option").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.sort;
    movies.sort((a, b) => {
      if (type === "title") return a.title.localeCompare(b.title);
      if (type === "year") return b.year - a.year;
      if (type === "ratingDesc") return avgRating(b.id) - avgRating(a.id);
      if (type === "ratingAsc") return avgRating(a.id) - avgRating(b.id);
      return 0;
    });
    renderRows();
  });
});

// Toggle theme (light/dark)
document.getElementById("themeToggle").addEventListener("change", e => {
  document.body.classList.toggle("light", e.target.checked);
});

// Hero more info
document.getElementById("heroInfo").addEventListener("click", () => {
  const f = movies.find(m => m.featured) || movies[2];
  if (f) openDetails(f.id);
});

// OMDb fetch
document.getElementById("omdbFetchBtn").addEventListener("click", async () => {
  const key = document.getElementById("omdbKey").value.trim();
  const term = document.getElementById("omdbTerm").value.trim();
  if (!key || !term) return;
  const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(term)}`);
  const data = await res.json();
  if (data.Search) {
    data.Search.slice(0, 9).forEach((m, i) => {
      movies.push({
        id: m.imdbID,
        title: m.Title,
        year: parseInt(m.Year) || 0,
        genre: "N/A",
        plot: "N/A",
        poster: m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450?text=No+Image",
        cat: ["original", "trending", "popular"][i % 3]
      });
    });
    renderRows();
    bootstrap.Modal.getInstance(document.getElementById("apiModal")).hide();
  }
});

//scroll controls
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
})



renderRows();


fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
  .then(res => res.json())
  .then(data => {
    const movies = data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    
    fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(videoData => {
        const trailer = videoData.results.find(
          v => v.type === "Trailer" && v.site === "YouTube"
        );

        if (trailer) {
          
          const youtubeUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}`;
          console.log("Trailer URL:", youtubeUrl); 
          document.getElementById("heroVideo").src = youtubeUrl;
        } else {
          console.log("No trailer found, fallback to background image.");
        }
      });
  });





    

  

    