import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api_key from './APIKEY';

const MovieView = ({ id }) => {
  const [currentMovie, updateMovie] = useState({});

  const getMovieData = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        updateMovie(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    getMovieData(id);
  }, []);
  if (currentMovie === {}) {
    return <div>... Loading ...</div>
  }
  return (
    <div>
      <h2>This is the view for single movies</h2>
      <h3>{currentMovie.original_title}</h3>
      <Link to='/'>Home</Link>
    </div>
  );

};

export default  MovieView;