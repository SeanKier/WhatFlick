import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const CurrentMovie = ({ currentMovie }) => {
  const { title, poster_path, vote_average, overview } = currentMovie;
  let description = overview;
  if (overview.length > 150) {
    description = overview.slice(0, 150) + '...';
  }

  return (
    <div
      id="single-movie-container"
      className="rounded"
    >
      <h2>
        {title}
      </h2>
      <img
        className="avatar rounded"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={`Avatar for ${title}`}
      />
      <div id="star">
        <FaStar color='rgb(255, 215, 0)' size={22} />
        <span className="vote">
          {vote_average}
        </span>
        <FaStar color='rgb(255, 215, 0)' size={22} />
      </div>
      <p className="description rounded">
        {description}
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