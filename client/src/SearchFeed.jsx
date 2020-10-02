import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { movieDBKey } from './APIKEY';
import Movies from './Movies';

const SearchFeed = ({ searchTerm, searched, searchFlag }) => {
  const [currentMovies, setCurrentMovies] = useState([]);

  const fetchMovie = () => {
    if (searched) {
      const queryString = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
      fetch(queryString)
        .then((response) => response.json())
        .then((response) => {
          setCurrentMovies(response.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    fetchMovie();
  }, [searchFlag]);

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

SearchFeed.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  searched: PropTypes.bool.isRequired,
  searchFlag: PropTypes.bool.isRequired,
};

export default SearchFeed;
