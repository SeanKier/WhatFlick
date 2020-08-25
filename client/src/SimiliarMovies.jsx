import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { api_key } from './APIKEY';
import Movies from './Movies';

const SimiliarMovies = ({ id, updateID }) => {
  const [currentMovies, setCurrentMovies] = useState([]);

  const fetchSimiliarMovies = () => {
    const queryString = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}&language=en-US&page=1`;
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

SimiliarMovies.propTypes = {
  id: PropTypes.number.isRequired,
  updateID: PropTypes.func.isRequired,
};

export default SimiliarMovies;
