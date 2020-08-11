import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import OtherView from './index';

const CurrentMovie = ({ currentMovie, updateID }) => {
  const { title, poster_path, vote_average, overview, id } = currentMovie;
  let description = overview;
  if (overview.length > 150) {
    description = overview.slice(0, 150) + '...';
  }

  const updateMovie = (id) => {
    updateID(id);
  }

  return (
    <div
      id="single-movie-container"
      className="rounded"
    >
      <Link onClick={() => updateMovie(id)} to='/other'>
        <h1>
          {title}
        </h1>
      </Link>

      <Link onClick={() => updateMovie(id)} to='/other'>
        <img
              className="avatar rounded"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={`Avatar for ${title}`}
        />
      </Link>
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

      <Link onClick={() => updateMovie(id)} to='/other'>MoreInfo</Link>

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

const Movies = ({ currentMovies, updateID }) => (

  <div id="movies-container">
    {currentMovies.map((movie, i) => (
      <CurrentMovie key={i} currentMovie={movie} updateID={updateID}/>
    ))}
  </div>
);

Movies.propTypes = {
  currentMovies: PropTypes.array.isRequired
};

export default Movies;