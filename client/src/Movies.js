import React from 'react';
import PropTypes from 'prop-types';

const CurrentMovie = ({ currentMovie }) => {
  const { title, poster_path, vote_average, overview } = currentMovie;

  return (
    <div id="single-movie-container">
      <h2>
        {title}
      </h2>
      <img
        className='avatar'
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={`Avatar for ${title}`}
      />
      <h4>
        {vote_average}
      </h4>
      <p>
        {overview}
      </p>
    </div>
  );
};

CurrentMovie.propTypes = {
  currentMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
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