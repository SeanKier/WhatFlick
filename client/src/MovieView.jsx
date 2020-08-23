import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import Reviews from './Reviews';
import Youtube from './Youtube';
import { api_key, youtubeAPIkey } from './APIKEY';

const StaticImage = ({ backdrop_path, title, isNowPlaying }) => {
  const handleClickIsPlaying = () => {
    isNowPlaying(true);
  };

  return (
    <div
      className="img-overlay-container"
      onClick={handleClickIsPlaying}
    >
      <img
        className="movie-img-backdrop"
        src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        alt={`Backdrop for ${title}`}
      />
      <FontAwesomeIcon
        icon={faPlayCircle}
        className="playbutton"
      />
    </div>
  );
};

const MovieView = ({ id, setSubGenres }) => {
  const [currentMovie, updateMovie] = useState({});
  const [currentVideoID, getVideo] = useState(null);
  const [nowPlaying, isNowPlaying] = useState(false);

  const searchYouTube = (query) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${query}%20trailer&type=video&videoDefinition=high&key=${youtubeAPIkey}`)
      .then((response) => response.json())
      .then((response) => {
        getVideo(response.items[0].id.videoId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMovieData = (currentID) => {
    fetch(`https://api.themoviedb.org/3/movie/${currentID}?api_key=${api_key}`)
      .then((response) => response.json())
      .then((response) => {
        searchYouTube(response.title);
        updateMovie(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovieData(id);
  }, []);

  const handleClickMoreLike = () => {
    setSubGenres([currentMovie.genres[0].name]);
  };

  const handleClickSetNewSub = (event) => {
    setSubGenres([event.target.innerHTML]);
  };

  const { imdb_id, title, popularity, overview, backdrop_path,
    poster_path, release_date, tagline, runtime, genres, vote_average } = currentMovie;
  if (currentMovie === {}) {
    return <div>... Loading ...</div>;
  }

  let genreList = null;
  if (genres !== undefined) {
    genreList = (
      <div>
        {genres.map((type, i) => {
          let comma = comma = <span>, </span>;
          if (i === genres.length - 1) {
            comma = null;
          }
          return (
            <span
                key={i}
              >
                <Link
                  className="link"
                  onClick={handleClickSetNewSub}
                  to="/"
                >
                  {type.name}
                </Link>
                {comma}
              </span>
          )})}
      </div>
    );
  }

  const readableRuntime = () => {
    if (runtime < 60) {
      return `${runtime} minutes`;
    }
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - (hours * 60);
    let hourString = 'hours';
    if (hours === 1) {
      hourString = 'hour';
    }
    let minuteString = 'minutes';
    if (minutes === 1) {
      minuteString = 'minute';
    }
    if (minutes === 0) {
      return `${hours} ${hourString}`;
    }
    return `${hours} ${hourString} and ${minutes} ${minuteString}`;
  };

  return (
    <div className="movie-view-wrapper">
      {title && (
      <div className="movie-view">
        <div className="info-container">
          <div className="movie-title">{title}</div>
          <div className="ratings-container">
            <div className="popularity">
              <div>
                Popularity: {popularity}
              </div>
              <div className="rating-score">
                Rating: {vote_average} / 10</div>
              <StarRatings
                rating={(vote_average / 2)}
                starRatedColor="rgb(76, 160, 175)"
                starDimension="20px"
                numberOfStars={5}
                starSpacing="1px"
                name="rating"
              />
            </div>
            <div className="premiere-date">
              <div>
                Premiere:
              </div>
              <div>
                {moment(Date.parse(release_date)).format('MMMM YYYY')}
              </div>
            </div>
            <div className="runtime">
              <div>
                Runtime:
              </div>
              <div>
                {readableRuntime()}
              </div>
            </div>
            <div className="genres">
              <div>{""}</div>
              {genreList}
            </div>
          </div>
          <div className="tagline">
            {tagline}
          </div>
        </div>
        <div className="movie-img-container">
          <img
            className="movie-img-item"
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={`Backdrop for ${title}`}
            />
          { !nowPlaying && (
            <StaticImage backdrop_path={backdrop_path} title={title} isNowPlaying={isNowPlaying} />
          )}
          { nowPlaying && (
            <Youtube currentVideoID={currentVideoID} />
          )}
        </div>
        <p>{overview}</p>
        <Reviews id={id} />
        <Link
          onClick={handleClickMoreLike}
          to="/"
        >
          See More Movies Like {title}
        </Link>
      </div>
      )}
    </div>
  );
};

MovieView.propTypes = {
  id: PropTypes.number.isRequired,
  setSubGenres: PropTypes.func.isRequired,
};

export default MovieView;
