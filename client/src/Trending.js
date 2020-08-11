import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

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
  const whatsNext = movies.slice(currentIndex + 1);

  return (
    <div className="trending-carousel">
        <h3>
            Currently Trending
        </h3>
       { currentIndex > 0 && (
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              onClick={handleLeftClick}
            />
       )}
        <img
            className="other-rounded"
            src={`https://image.tmdb.org/t/p/w500/${movies[currentIndex].backdrop_path}`}
            alt={`Backdrop for ${movies[currentIndex].title}`}
        />
        { currentIndex < 3 && (
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              onClick={handleRightClick}
            />
        )}
        <div className="whats-next">
          <h4>
            Coming up Next
          </h4>
          <ul className={"trending-list"}>
            {whatsNext.map((movie, i) => (
              <li key={i}>
                <div
                  className="trending-item"
                  onClick={() => changeMovie(i + 1)}
                >
                  {movie.title}
                </div>
              </li>
            ))}
          </ul>
        </div>
    </div>

  );
};

Trending.propTypes = {
  movies: PropTypes.array.isRequired
};

export default Trending;