import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css";
function Movie({ title }) {
  //handling user search
  const [search, setSearch] = useState("Latest");
  //   store movie data
  const [data, setData] = useState([]);

  //fetching movie data
  const fetchLatest = async () => {
    try {
      const fetchMovie = await fetch(
        `https://www.omdbapi.com/?s=${search}&apikey=583936a`
      );
      const fetchData = await fetchMovie.json();
      console.log(fetchData.Search);
      setData(fetchData.Search);
    } catch (error) {
      console.log("Error fetching movie data:", error);
      setData(fetchData.Search);
    }
  };
  useEffect(() => {
    fetchLatest();
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo">
          <h3>{title}</h3>
        </div>
        <div className="search">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchLatest();
            }}
          >
            <input
              type="text"
              placeholder="search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
      <div className="movie">
        <h3>Preview</h3>
        <div className="container">
          {data && data.length > 0 ? (
            data.map((curVal) => (
              <div key={curVal.imdbID}>
                <div className="box">
                  <div className="img_box">
                    <img src={curVal.Poster} alt={curVal.Title} />
                  </div>
                  <div className="details">
                    <h3>{curVal.Title}</h3>
                    <h4>Release Date: {curVal.Year}</h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="not-found">
              <h3>Movie not found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Movie;
