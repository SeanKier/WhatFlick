import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { api_key } from './APIKEY';
import Movies from './Movies';

const SearchFeed = ({ searchTerm, updateID }) => {
  const [currentMovies, setCurrentMovies] = useState([]);

  const fetchMovie = () => {
    const queryString = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
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
    fetchMovie();
  }, []);

  return (
    <div className="search-feed">
      <div>
        Search Results for {searchTerm}:
      </div>
      { currentMovies.length === 0 && (
        <div>
          ... Loading ...
        </div>
      )}
      { currentMovies.length > 0 && (
        <div>
          <Movies currentMovies={currentMovies} updateID={updateID} />
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

SearchFeed.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  updateID: PropTypes.func.isRequired,
};

export default SearchFeed;
