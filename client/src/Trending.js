import React, { useState } from 'react';
import PropTypes from 'prop-types';


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
           <button onClick={handleLeftClick}>
                Left
            </button>
       )}
        <img
            className="other-rounded"
            src={`https://image.tmdb.org/t/p/w500/${movies[currentIndex].backdrop_path}`}
            alt={`Backdrop for ${movies[currentIndex].title}`}
        />
        { currentIndex < 3 && (
            <button onClick={handleRightClick}>
                Right
            </button>
        )}
        <div class="whats-next">
          <h4>
            Coming up Next
          </h4>
          <ul className={"trending-list"}>
            {whatsNext.map((movie, i) => (
              <li>
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

Movies.propTypes = {
  movies: PropTypes.array.isRequired
};

export default Trending;