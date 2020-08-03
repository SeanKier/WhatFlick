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
        console.log(response);
        updateMovie(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    getMovieData(id);
  }, [])

  const { imdb_id, title, popularity, overview, backdrop_path, poster_path, release_date } = currentMovie;

  if (currentMovie === {}) {
    return <div>... Loading ...</div>
  }
  return (
    <div>
      <h3>{title}</h3>
      <div>{release_date}</div>
      <img
        className="avatar rounded"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={`Avatar for ${title}`}
      />
      <p>{overview}</p>
      <div>Popularity: {popularity}</div>
      <Link to='/'>Home</Link>
    </div>
  );

};

export default  MovieView;