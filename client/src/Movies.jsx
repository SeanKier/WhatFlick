import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import MovieContext from './MovieContext';

const CurrentMovie = ({ currentMovie, index }) => {
  const {
    title, poster_path, vote_average, overview, id
  } = currentMovie;
  let description = overview;
  if (overview.length > 150) {
    description = `${overview.slice(0, 150)}...`;
  }
  const { updateMovieID } = useContext(MovieContext);
  const handleClick = () => {
    updateMovieID(id);
  };

  const titleStyle = { fontSize: 15 };
  let movieTitle = (
    <div
      className="movie-feed-title"
    >
      {title}
    </div>
  );
  if (title.length >= 25) {
    movieTitle = (
      <div
        className="movie-feed-title"
        style={titleStyle}
      >
        {title}
      </div>
    );
  }

  return (
    <div
      className="rounded single-movie-container"
    >
      <Link
        className="link"
        onClick={handleClick}
        to="/movie"
      >
        {movieTitle}
      </Link>

      <Link
        onClick={handleClick}
        to="/movie"
      >
        <img
          className="avatar rounded"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={`Avatar for ${title}`}
        />
      </Link>
      <div
        id="star"
      >
        <FaStar
          color="rgb(255, 215, 0)"
          size={22}
        />
        <span className="vote">
          {vote_average}
        </span>
        <FaStar
          color="rgb(255, 215, 0)"
          size={22}
        />
      </div>
      <p className="description rounded">
        {description}
      </p>
      <Link
        className="link more-info"
        onClick={handleClick}
        to="/movie"
      >
        MoreInfo
      </Link>
    </div>
  );
};

CurrentMovie.propTypes = {
  currentMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
};

const Movies = ({ currentMovies }) => (
  <div id="movies-container">
    {currentMovies.map((movie, i) => (
      <CurrentMovie key={i} currentMovie={movie} index={i} />
    ))}
  </div>
);

Movies.propTypes = {
  currentMovies: PropTypes.array.isRequired,
};

export default Movies;
