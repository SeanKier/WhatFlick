import React, { useState, useEffect } from 'react';
const keys = require('./APIKEY');

const Youtube = ({ currentVideoID }) => (
  <div>
    <div>Youtube Stuff</div>
    <div>{currentVideoID}</div>
    <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${currentVideoID}`} allowFullScreen></iframe>
  </div>
);

export default Youtube;