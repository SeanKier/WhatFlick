import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import SearchFeed from './SearchFeed';
import MovieView from './MovieView';
import Home from './Home';

const App = () => {
  const [currentMovieID, updateMovieID] = useState(0);
  const [subGenres, setSubGenres] = useState(['All']);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Router>
      <div className="search-form">
        <input type="text" name="search" onChange={handleChange} />
        <Link
          to="/search"
        >
          <div>Search</div>
        </Link>
      </div>
      <div className="wrapper">
        <Link
          className="center"
          to="/"
        >
          <h1 id="site-title">Watch Tonight</h1>
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
          path="/other"
          render={(props) => (
            <MovieView
              {...props}
              id={currentMovieID}
              setSubGenres={setSubGenres}
            />
          )}
        />
        <Route
          path="/search"
          render={(props) => (
            <SearchFeed
              {...props}
              searchTerm={searchTerm}
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
