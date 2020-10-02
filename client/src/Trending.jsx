import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

import MovieContext from './MovieContext';

const TrendingItem = ({ movie, index }) => {
  const { title, id } = movie;
  const { updateMovieID } = useContext(MovieContext);
  const handleClickUpdateID = () => {
    updateMovieID(id);
  };

  return (
    <div
      id={`card-${index}`}
      className="card"
    >
      <div
        className="trending-carosouel-item"
      >
        <h3 className="trending-title">
          Currently Trending
        </h3>
        <Link
          className="link"
          onClick={handleClickUpdateID}
          to="/movie"
        >
          <div className="carosouel-movie-title link">
            {title}
          </div>
        </Link>
        <Link
          onClick={handleClickUpdateID}
          to="/movie"
        >
          <img
            className="carosouel-image"
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={`Backdrop for ${movie.title}`}
          />
        </Link>
      </div>
    </div>
  );
};

TrendingItem.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const Trending = ({ movies }) => {
  const [currentIndex, changeMovie] = useState(0);

  const handleRightClick = () => {
    if (currentIndex < 3) {
      changeMovie(currentIndex + 1);
    }
  }
  const handleLeftClick = () => {
    if (currentIndex > 0) {
      changeMovie(currentIndex - 1);
    }
  }

  return (
    <div className="trending-carousel">
      <div className={`cards-slider active-slide-${currentIndex}`}>
        { currentIndex > 0 && (
        <div className="left-button">
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            onClick={handleLeftClick}
          />
        </div>
        )}
        { currentIndex < 3 && (
        <div className="right-button">
          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            onClick={handleRightClick}
          />
        </div>

        )}
        <div className="cards-slider-wrapper">
          {movies.map((movie, i) => (
            <TrendingItem key={i} movie={movie} index={i} />
          ))}
        </div>
      </div>
    </div>

  );
};

Trending.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default Trending;
