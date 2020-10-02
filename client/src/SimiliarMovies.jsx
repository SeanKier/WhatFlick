import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { movieDBKey } from './APIKEY';
import Movies from './Movies';
import MovieContext from './MovieContext';

const SimiliarMovies = () => {
  const [currentMovies, setCurrentMovies] = useState([]);

  const { currentMovieID } = useContext(MovieContext);
  const fetchSimiliarMovies = () => {
    const queryString = `https://api.themoviedb.org/3/movie/${currentMovieID}/similar?api_key=${movieDBKey}&language=en-US&page=1`;
    fetch(queryString)
      .then((response) => response.json())
      .then((response) => {
        setCurrentMovies(response.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchSimiliarMovies();
  }, []);

  return (
    <div className="similiar-feed">
      <div>
        Similiar Movies:
      </div>
      { currentMovies.length === 0 && (
        <div>
          ... Loading ...
        </div>
      )}
      { currentMovies.length > 0 && (
        <div>
          <Movies currentMovies={currentMovies} />
        </div>
      )}
      <Link
        className="center"
        to="/"
      >
        <h2 className="home-button">Home</h2>
      </Link>
    </div>
  );
};

export default SimiliarMovies;
