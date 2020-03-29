import React from 'react';
import PropTypes from 'prop-types';

const CurrentMovie = ({ currentMovie }) => (
  <div id="single-movie-container">
    <h2>
      {currentMovie.title}
    </h2>
    <h4>
      {currentMovie.vote_average}
    </h4>
    <p>
      {currentMovie.overview}
    </p>
  </div>
);

CurrentMovie.propTypes = {
  currentMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired
  })
};

const Movies = ({ currentMovies }) => (
  <div id="movies-container">
    {currentMovies.map((movie, i) => (
      <CurrentMovie key={i} currentMovie={movie}/>
    ))}
  </div>
);

Movies.propTypes = {
  currentMovies: PropTypes.array.isRequired
};

export default Movies;