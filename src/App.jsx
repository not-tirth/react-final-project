import React, { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "5e2eca368fcc3d76242ba06ac91278f3";
const BASE = "https://api.themoviedb.org/3";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("popular");
  const [selected, setSelected] = useState(null);

  const getMovies = async () => {
    let url;

    if (search) {
      url = `${BASE}/search/movie?api_key=${API_KEY}&query=${search}`;
    } else {
      const map = {
        popular: "/movie/popular",
        latest: "/movie/now_playing",
        tv: "/tv/popular",
      };
      url = `${BASE}${map[category]}?api_key=${API_KEY}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results || []);
  };

  useEffect(() => {
    getMovies();
  }, [search, category]);

  return (
    <div className="app">
  
      <div className="navbar">
        <h2>CYRO.SE</h2>

        <div className="nav-links">
          <span onClick={() => setCategory("latest")}>Latest</span>
          <span onClick={() => setCategory("tv")}>TV</span>
          <span onClick={() => setCategory("popular")}>Movies</span>
        </div>

        <input
          className="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="movies">
        {movies.map((m) => (
          <div key={m.id} className="card" onClick={() => setSelected(m)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              alt=""
            />
            <p>{m.title || m.name}</p>
          </div>
        ))}
      </div>

  
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://image.tmdb.org/t/p/w500${selected.poster_path}`}
              alt=""
            />
            <div>
              <h2>{selected.title || selected.name}</h2>
              <p>⭐ {selected.vote_average}</p>
              <p>{selected.release_date || selected.first_air_date}</p>
              <p>{selected.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}