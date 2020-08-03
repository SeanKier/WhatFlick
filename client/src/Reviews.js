import React, { useState, useEffect } from 'react';

const keys = require('./APIKEY');

const CurrentReview = ({ review }) => {
  return (
    <div id='single-review'>
      <h4>{review.author}</h4>
      <p>{review.content}</p>
    </div>
  );
}

const Reviews = ({ id }) => {

  const [currentReviews, updateReviews] = useState([]);

  const getReviews = (id) => {

    fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${keys.api_key}&language=en-US&page=1`)
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
      {currentReviews.map((review, i) => (
        <CurrentReview key={i} review={review} />
      ))}
    </div>
  );

}

export default Reviews;