import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Route, Link, Redirect, BrowserRouter as Router,
} from 'react-router-dom';

import SearchFeed from './SearchFeed';
import MovieView from './MovieView';
import Home from './Home';
import SimiliarMovies from './SimiliarMovies';
import ActorView from './ActorView';

const App = () => {
  const [currentMovieID, updateMovieID] = useState(0);
  const [subGenres, setSubGenres] = useState(['All']);
  const [searchTerm, setSearchTerm] = useState('');
  const [actorID, setActorID] = useState(0);
  const [searched, setSearched] = useState(false);
  const [searchFlag, setFlag] = useState(true);

  const handleChange = (event) => {
    if (event.target.value) {
      setSearchTerm(event.target.value);
    }
  };

  const handleFlagChange = () => {
    setFlag(!searchFlag);
  };

  const handleSearchClick = () => {
    handleFlagChange();
    if (searchTerm !== '') {
      setSearched(true);
    }
  };

  const onKeyDownHandler = (event) => {
    handleFlagChange();
    if (event.key === 'Enter') {
      setSearched(true);
    }
  };

  useEffect(() => {
    setSearched(false);
  }, [searchTerm]);

  return (
    <Router>
      <div className="wrapper">
        <div className="search-form">
          <input
            className="search-input"
            type="text"
            name="search"
            size="65"
            placeholder="Search for movies here"
            onChange={handleChange}
            onKeyPress={onKeyDownHandler}
          />
          {(searchTerm !== '' && searched) && <Redirect to="/search" />}
          <button
            type="submit"
            className="search-button"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
        <Link
          className="center"
          to="/"
        >
          <div className="titles">
            <h1 id="site-title">What Flick</h1>
            <img
              className="moviedb-logo"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              alt="The movie database logo"
            />
          </div>
        </Link>

        <Route
          exact path="/"
          render={(props) => (
            <Home
              {...props}
              updateID={updateMovieID}
              subGenres={subGenres}
              setSubGenres={setSubGenres}
            />
          )}
        />
        <Route
          path="/movie"
          render={(props) => (
            <MovieView
              {...props}
              id={currentMovieID}
              setSubGenres={setSubGenres}
              setActorID={setActorID}
            />
          )}
        />
        <Route
          path="/search"
          render={(props) => (
            <SearchFeed
              {...props}
              updateID={updateMovieID}
              searchTerm={searchTerm}
              searched={searched}
              searchFlag={searchFlag}
            />
          )}
        />
        <Route
          path="/morelike"
          render={(props) => (
            <SimiliarMovies
              {...props}
              updateID={updateMovieID}
              id={currentMovieID}
            />
          )}
        />
        <Route
          path="/actor"
          render={(props) => (
            <ActorView
              {...props}
              actorID={actorID}
              updateID={updateMovieID}
            />
          )}
        />
      </div>
    </Router>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
