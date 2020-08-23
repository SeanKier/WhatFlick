import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { api_key } from './APIKEY';

const CurrentReview = ({ review }) => {
  const { author, content } = review;

  return (
    <div className="single-review">
      <div className="user-info-container">
        <div className="user-icon-container">
          <FontAwesomeIcon
            className="user-icon"
            icon={faUserCircle}
          />
        </div>
        <div className="review-author">
          {author}
        </div>
      </div>

      <p>{content}</p>
    </div>
  );
}

CurrentReview.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })
};

const Reviews = ({ id }) => {

  const [currentReviews, updateReviews] = useState([]);

  const getReviews = (id) => {

    fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}&language=en-US&page=1`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        updateReviews(response.results);
      })
      .catch(err => {
        console.log(err);
      });

  }

  useEffect(() => {
    getReviews(id);
  }, [])

  if (currentReviews === []){
    return <div>Loading</div>
  }
  return (
    <div id='reviews'>
      {currentReviews.length > 0 && (
        <div>
          <div className="review-title">
            User Reviews
          </div>
          {currentReviews.map((review, i) => (
            <CurrentReview key={i} review={review} />
          ))}
        </div>
      )}

    </div>
  );

}

Reviews.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Reviews;