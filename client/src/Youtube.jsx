import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Youtube = ({ currentVideoID }) => (
  <div>
    <iframe title="Embeded Youtube" className="movie-img-movie" src={`https://www.youtube.com/embed/${currentVideoID}?autoplay=1`} allowFullScreen />
  </div>
);

Youtube.propTypes = {
  currentVideoID: PropTypes.string.isRequired,
};

export default Youtube;
