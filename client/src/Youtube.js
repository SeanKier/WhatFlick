import React, { useState, useEffect } from 'react';
const keys = require('./APIKEY');
import PropTypes from 'prop-types';

const Youtube = ({ currentVideoID }) => (
  <div>
    <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${currentVideoID}`} allowFullScreen></iframe>
  </div>
);

Youtube.propTypes = {
  currentVideoID: PropTypes.string.isRequired,
};

export default Youtube;