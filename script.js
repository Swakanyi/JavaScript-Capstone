//Sample movies
    const sampleMovies = [
      {id: 'tt31806048', title: 'Hostage', year: 2025, genre: 'Drama', cat: 'new on bingebox', plot: "When the PM's husband is kidnapped and the visiting French President is blackmailed, the two political leaders face unimaginable choices.", poster: 'hostage1.jpg'},
      {id: 'tt27951663', title: 'Fatal Seduction', year: 2023, genre: 'Drama, Thriller', cat: 'new on bingebox', plot: 'A married woman goes on a dangerous weekend trip away from home that sparks desire but ends tragically, making her wonder if the people close to her are trustworthy.', poster: 'fatal.jpg'},
      {id: 'tt32146392', title: 'Two Graves', year: 2025, genre: 'Mystery, Thriller', cat: 'new on bingebox', plot: 'After her 16-year-old granddaughter and her friend disappear, Isabel starts an unsanctioned investigation to uncover the truth behind their disappearance.', poster: 'two.jpg'},
      {id: 'tt34691776', title: 'Abandoned Man', year: 2025, genre: 'Drama', cat: 'new on bingebox', plot: 'After years behind bars, a tormented man tries to rebuild his life, but an unexpected bond unveils a shocking truth.', poster: 'aband.jpg'},
      {id: 'tt8368512', title: 'The Courier', year: 2020, genre: 'Action, Thriller', cat: 'new on bingebox', plot: 'A former special ops soldier turned courier rescues a man under house arrest when an assassination goes terribly wrong.', poster: 'courier.jpg'},
      {id: 'tt3715152', title: 'Shooting Stars', year: 2023, genre: 'Drama, Sport', cat: 'new on bingebox', plot: 'A biographical sports drama about LeBron James and his high school basketball journey.', poster: 'shooting.jpg' },
      {id: 'tt13443470', title: 'Wednesday', year: 2022, genre: 'Comedy, Crime, Fantasy', cat: 'new on bingebox', plot: 'Follows Wednesday Addams years as a student, when she attempts to master her psychic ability, thwart a killing spree, and solve the mystery that embroiled her parents.', poster: 'wed.jpg' },

      {id:'tt10872600', title:'Spider‑Man: No Way Home', year:2021, genre:'Action', cat:'original', plot:'Peter Parker seeks help after his identity is revealed.', poster:'3f360f69-369b-41a1-8183-c32a50804149.jpeg'},
      {id:'tt4574334', title:'Stranger Things', year:2016, genre:'Sci‑Fi', cat:'original', plot:'A group of kids face supernatural mysteries in their town.', poster:'Stranger Things season 1 poster.jpeg'},
      {id:'tt3521164',title: 'Moana',year: 2016,  genre: 'Animation, Adventure, Family', cat: 'original',plot: 'An adventurous teenager sets sail on a daring mission to save her people, joined by the demigod Maui.',poster: 'Moan poster.jpeg'},
      {id:'tt10648342', title:'Thor: Love and Thunder', year:2022, genre:'Action', cat:'original', plot:'Thor embarks on a journey unlike anything he has ever faced.', poster:'8b7e2256-3e1c-4ee2-a739-01ffa8cf4ff6.jpeg'},
      {id:'tt4154796', title:'Avengers: Endgame', year:2019, genre:'Action', cat:'original', plot:'The Avengers assemble once more to undo Thanos’ snap.', poster:'avengers.jpeg'},
      {id:'tt0183869', title:'Taxi', year:1998, genre:'Action', cat:'original', plot:'To work off his tarnished driving record, a policeman teams up with a fast-talking cab driver to chase down a gang of bank robbers.', poster:'Movie_ Taxi.jpeg'},
      {id:'tt0118615', title:'Anaconda', year:1997, genre:'Adventure', cat:'original', plot:'A documentary film crew is hunted by a giant anaconda while searching for a lost tribe in the Amazon rainforest.', poster:'Anaconda.jpeg'},
      {Title:"White House Down", Year:"2013", Genre:"Action", cat:"original", plot:"While on a tour of the White House with his young daughter, a policeman springs into action to save his child and protect the president from a heavily armed group of dangerous terrorists.", poster:"white house.jpeg"},
       
      {id: 'tt8740614', title: 'The Residence', year: 2025, genre: 'Mystery, Comedy-Drama, Thriller', cat: 'tv comedies', plot: 'A quirky detective is called to the White House Residence to solve the murder of the chief usher during a state dinner, unravelling secrets behind the corridors "upstairs, downstairs, and backstairs."', poster: 'reside.jpg'},
      {id:'tt1586680', title:'Shameless', year:2011, genre:'Comedy-drama', cat:'tv comedies', plot:'The series depicts the poor, dysfunctional Gallagher family—led by substance-dependent Frank—whose six kids scam, lie, fight and steal to survive in Chicago.', poster:'shameless.jpg'},
      {id: 'tt1416765', title: 'Parenthood', year: 2010, genre: 'Family Drama', cat: 'tv comedies', plot: 'The show follows the multigenerational Braverman family as they navigate life’s joys and tragedies in modern-day California.', poster: 'parenth.jpg'},
      {id: 'tt26426076', title: 'Geek Girl', year: 2024, genre: 'Teen Drama', cat: 'tv comedies', plot: 'An awkward, neurodivergent teenager named Harriet unexpectedly becomes a model and embarks on a life-affirming journey of confidence and friendship.', poster: 'geek.jpg'},
      {id: 'tt28267514', title: 'Thank You, Next', year: 2024, genre: 'Drama', cat: 'tv comedies', plot: 'After the pain of her first love and betrayal, successful lawyer Leyla Taylan navigates career, romance, and resilience.', poster: 'thankyou.jpg'},
      {id: 'tt17361756', title: 'Survival of the Thickest', year: 2023, genre: 'drama comedy', cat: 'tv comedies', plot: 'Black, plus-size and newly single, Mavis unexpectedly finds herself having to rebuild her life—and her confidence.', poster: 'survival.jpg'},
      {id: 'tt13400006', title: 'Mr. Queen', year: 2020, genre: 'Comedy, Fantasy, Historical', cat: 'tv comedies', plot: 'A modern man’s spirit gets trapped in the body of a queen in Joseon-era Korea, leading to hilarious and chaotic royal drama.', poster: 'queen.jpg'},

      {id: 'tt15302054', title: 'Young, Famous & African', year: 2022, genre: 'Reality', cat: 'made in africa', plot: 'Follows a group of famous African media personalities as they pursue careers and love in Johannesburg.', poster: 'young.jpg'},
      {id: 'tt32599506', title: "The Bahati's Empire", year: 2024, genre: 'Reality', cat: 'made in africa', plot: 'Hitmaker Bahati and his wife Diana navigate fame, parenthood, and infidelity rumors while living lavishly in Nairobi.', poster: 'bahatis.jpg'},
      {id: 'tt36242582', title: 'Meet the Khumalos', year: 2025, genre: 'Comedy, Romance, Drama', cat: 'made in africa', plot: 'Two moms—once best friends turned enemies—engage in a neighborhood war when they discover their kids are madly in love.', poster: 'khumalo.jpg'},
      {id: "tt0375642", title: "Tsotsi", year: 2005, genre: "Crime Drama", cat: "made in africa", plot: "A young street thug in Johannesburg finds redemption—and a sense of humanity—after stealing a car and discovering a baby in the back seat.", poster: "tsotsi.jpg"},
      {id: "tt1136608", title: "District 9", year: 2009, genre: "Sci-Fi Thriller", cat: "made in africa", plot: "Aliens confined to slums in Johannesburg face human prejudice, and one man’s transformation challenges societal norms and his own identity.", poster: "distr.jpg"},
      {id: 'tt33362047', title: 'Last Year Single', year: 2024, genre: 'Romantic Comedy, Drama', cat: 'made in africa', plot: 'Three inseparable friends, dissatisfied with their romantic prospects, navigate the ups and downs of love and money while being there for one another.', poster: 'lastyear.jpeg'},
      {id: 'tt29313917', title: 'Mvera', year: 2023, genre: 'Drama, Thriller', cat: 'made in africa', plot: 'Desperate for a better life, a hard-headed young woman signs up for an alluring work-abroad scheme, only to discover it is a front for organ trafficking.', poster: 'mvera.jpeg'},
      
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
function renderRows(list = movies) {
  ["new on bingebox", "original", "tv comedies", "made in africa", "trending", "popular"].forEach(cat => {
    const rail = document.getElementById(`rail-${cat}`);
    rail.innerHTML = "";
    list.filter(m => m.cat === cat).forEach(m => {
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
  if (!text || text.length < 2) {
    alert("Review must be at least 2 characters.");
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
document.getElementById("searchForm").addEventListener("submit", async e => {
  e.preventDefault();

  const q = document.getElementById("searchInput").value.trim();
  const movieColumn = document.querySelector(".movie-column");

  //If empty -> reset to default sampleMovies
  if (!q) {
    movieColumn.querySelector("main").style.display = "block"; 
    const searchSection = document.getElementById("searchSection");
    if (searchSection) searchSection.remove(); 
    renderRows();
    return;
  }

  try {
    const API_KEY = "168f6399"; //  OMDb key
    const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${API_KEY}`);
    const data = await res.json();

    // Hide rows
    movieColumn.querySelector("main").style.display = "none";

    // Remove old search section if any
    let searchSection = document.getElementById("searchSection");
    if (searchSection) searchSection.remove();

    // Create new search results section
    searchSection = document.createElement("div");
    searchSection.id = "searchSection";

    const rowTitle = document.createElement("div");
    rowTitle.className = "d-flex justify-content-between align-items-center mt-3";
    rowTitle.innerHTML = `<div class="row-title">Search Results for "${q}"</div>`;
    searchSection.appendChild(rowTitle);

    const rail = document.createElement("div");
    rail.className = "rail";
    searchSection.appendChild(rail);

    if (data.Search) {
      data.Search.forEach(m => {
        const div = document.createElement("div");
        div.className = "poster";
        div.dataset.id = m.imdbID;
        div.innerHTML = `
          <img src="${m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150"}" alt="${m.Title}">
          <div class="overlay"><div class="title">${m.Title}</div></div>
        `;
        div.addEventListener("click", async () => {
          const detailRes = await fetch(`https://www.omdbapi.com/?i=${m.imdbID}&apikey=${API_KEY}`);
          const detail = await detailRes.json();
          activeMovieId = m.imdbID;
          document.getElementById("detailsTitle").textContent = detail.Title;
          document.getElementById("detailsPoster").src = detail.Poster;
          document.getElementById("detailsYear").textContent = detail.Year;
          document.getElementById("detailsGenre").textContent = detail.Genre;
          document.getElementById("detailsPlot").textContent = detail.Plot;
          renderReviews();
          new bootstrap.Modal(document.getElementById("detailsModal")).show();
        });
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



// Sort
document.querySelectorAll(".sort-option").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.sort;
    let sortedMovies = [...movies];

    if (type === "title") {
      sortedMovies.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }
    if (type === "year") {
      sortedMovies.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
    if (type === "genre") {
      sortedMovies.sort((a, b) => (a.genre || "").localeCompare(b.genre || ""));
    }
    if (type === "reset") {
      sortedMovies = [...movies];
    }

    renderRows(sortedMovies);
  });
});

// Filtering by genre
document.querySelectorAll(".genre-option").forEach(btn => {
  btn.addEventListener("click", () => {
    const genre = btn.dataset.genre;
    const filteredMovies = movies.filter(m => m.genre && m.genre.includes(genre));
    renderRows(filteredMovies);
  });
});

//Reset filter
document.querySelector(".reset-option").addEventListener("click", () => {
  renderRows(movies);
});



// Toggle theme (light/dark)
document.getElementById("themeToggle").addEventListener("change", e => {
  document.body.classList.toggle("light", e.target.checked);
});

// Hero more info
document.getElementById("heroInfo").addEventListener("click", () => {
  const f = movies.find(m => m.featured) || movies[9];
  if (f) openDetails(f.id);
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

//mute button
let player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("heroVideo", {
      events: {
        onReady: (event) => {
          event.target.mute(); // start muted
        }
      }
    });
  }

  // Wait until API & player are ready
  document.addEventListener("DOMContentLoaded", () => {
    const muteBtn = document.getElementById("muteBtn");

    muteBtn.addEventListener("click", () => {
      if (!player || typeof player.isMuted !== "function") return; // guard

      if (player.isMuted()) {
        player.unMute();
        muteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
      } else {
        player.mute();
        muteBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
      }
    });
  });







    

  

    