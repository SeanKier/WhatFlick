import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Trending = ({ movies, updateID, currentIndex,changeMovie }) => {


  return (
    <div className="trending-carousel">
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
                      <div className="trending-title">
                        Currently Trending
                      </div>
                                      <Link
                        className="link"
                        // onClick={handleClickUpdateID}
                        to='/other'
                      >
                        <h3>
                          {movie.title}
                        </h3>
                      </Link>
                      <Link
                        // onClick={handleClickUpdateID}
                        to='/other'
                      >
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
};

Trending.propTypes = {
  movies: PropTypes.array.isRequired,
  updateID: PropTypes.func.isRequired
};

export default Trending;