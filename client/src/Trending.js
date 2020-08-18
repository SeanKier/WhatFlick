import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Carosouel = ({ movies, handleLeftClick, handleRightClick, currentIndex }) => (
  <div className="carousel">
      { currentIndex > 0 && (
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              onClick={handleLeftClick}
            />
       )}
        { currentIndex < 3 && (
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              onClick={handleRightClick}
            />
        )}
         <div className={`cards-slider active-slide-${currentIndex}`}>
           <div className="cards-slider-wrapper" style={{
                  'transform': `translateX(-${currentIndex*(100/movies.length)}%)`
                }}>
            {movies.map((movie, i) => (
                  <div
                    id={`card-${i}`}
                    className="card"
                    key={i}
                  >
                    <div
                      className="trending-carosouel-item"
                    >
                      <Link onClick={() => updateID(movie.id)} to='/other'>
                        <h2>
                          {movie.title}
                        </h2>
                      </Link>
                      <Link onClick={() => updateID(movie.id)} to='/other'>
                        <img
                            className="other-rounded"
                            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                            alt={`Backdrop for ${movie.title}`}
                        />
                      </Link>
                    </div>
                  </div>
                ))}

           </div>
         </div>
  </div>
);

Carosouel.propTypes = {
  movies: PropTypes.array.isRequired,
  handleLeftClick: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired
};

const ComingNext = ({ whatsNext }) => (
  <div className="whats-next">
    <h4>
      Coming up Next
    </h4>
    <ul className={"trending-list"}>
      {whatsNext.map((movie, i) => (
        <div className="trending-item-container">
          <li key={i}
          className="trending-item"
          >
            <div
              onClick={() => changeMovie(i + 1)}
            >
              <div className="trending-item-title">
              <Link onClick={() => updateID(movie.id)} to='/other'>
                <h1>
                  {movie.title}
                </h1>
              </Link>
              </div>
              <Link onClick={() => updateID(movie.id)} to='/other'>
                <img
                    className="trending-item-img"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`Backdrop for ${movie.title}`}
                />
              </Link>
            </div>
          </li>
        </div>
      ))}
    </ul>
  </div>
);

ComingNext.propTypes = {
  whatsNext: PropTypes.array.isRequired
};

const Trending = ({ movies, updateID }) => {
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
  const whatsNext = movies.slice(currentIndex + 1);

  return (
    <div className="trending-carousel">
      <h2 className="title">
        Currently Trending
      </h2>
      <Carosouel movies={movies} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick} currentIndex={currentIndex} />
      <ComingNext whatsNext={whatsNext} />
    </div>

  );
};

Trending.propTypes = {
  movies: PropTypes.array.isRequired,
  updateMovie: PropTypes.func.isRequired
};

export default Trending;