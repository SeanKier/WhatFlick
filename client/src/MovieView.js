import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Reviews from './Reviews';
import Youtube from './Youtube';
import { api_key, youtubeAPIkey } from './APIKEY';

const MovieView = ({ id, setSubGenres }) => {
  const [currentMovie, updateMovie] = useState({});
  const [currentVideoID, getVideo] = useState(null);

  const getMovieData = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        searchYouTube(response.title);
        updateMovie(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const searchYouTube = (query) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${query}%20trailer&type=video&videoDefinition=high&key=${youtubeAPIkey}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        getVideo(response.items[0].id.videoId);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovieData(id);
  }, [])

  const { imdb_id, title, popularity, overview, backdrop_path, poster_path, release_date } = currentMovie;
  if (currentMovie === {}) {
    return <div>... Loading ...</div>
  }


  return (
    <div>
      <Link
        onClick={() => setSubGenres(['All'])}
        to='/'
      >
        Home
      </Link>
      <h3>{title}</h3>
      <div>{release_date}</div>
      <img
        className="other-rounded"
        src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        alt={`Backdrop for ${title}`}
      />
      <p>{overview}</p>
      <div>Popularity: {popularity}</div>
      <Reviews id={id} />
      { currentVideoID && (
        <Youtube currentVideoID={currentVideoID}/>
      )}
      <Link
        onClick={() => setSubGenres([currentMovie.genres[0].name])}
        to='/'
      >
        See More Movies Like{title}
      </Link>

    </div>
  );

};

MovieView.propTypes = {
  id: PropTypes.number.isRequired,
  setSubGenres: PropTypes.func.isRequired
};

export default  MovieView;