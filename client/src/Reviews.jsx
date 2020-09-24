import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { movieDBKey } from './APIKEY';

const CurrentReview = ({ review }) => {
  const [readMore, isReadMore] = useState(false);
  const { author, content } = review;
  const slicedReviewContent = `${content.slice(0, 500)}...`;

  const hanldeReadMoreClick = () => {
    isReadMore(true);
  };

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
      { (!readMore && content.length >= 500) && (
        <div>
          <p>
            {slicedReviewContent}
            <span
              className="read-more-link"
              onClick={hanldeReadMoreClick}
            >
              Read More
            </span>
          </p>

        </div>
      )}
      { (readMore || content.length < 500) && (
        <div>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

CurrentReview.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

const Reviews = ({ id }) => {
  const [currentReviews, updateReviews] = useState([]);

  const getReviews = (currentID) => {
    fetch(`https://api.themoviedb.org/3/movie/${currentID}/reviews?api_key=${movieDBKey}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((response) => {
        updateReviews(response.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReviews(id);
  }, []);

  if (currentReviews === []) {
    return <div>Loading</div>;
  }
  return (
    <div id="reviews">
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
};

Reviews.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Reviews;
