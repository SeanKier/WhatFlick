import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import MovieView from './MovieView';
import Home from './Home';

const App = () => {
  const [currentMovieID, updateMovieID] = useState(0);
  const [subGenres, setSubGenres] = useState(['All']);

  return(
    <Router>
      <div className="wrapper">
        <Link
          className="center"
          to='/'
        >
          <h1 id="site-title" >Watch Tonight</h1>
        </Link>
        <Route
            exact path="/"
            render={(props) => <Home {...props} updateID={updateMovieID} subGenres={subGenres} setSubGenres={setSubGenres} />}
        />
        <Route
            path="/other"
            render={(props) => <MovieView {...props} id={currentMovieID} setSubGenres={setSubGenres} />}
        />
      </div>
    </Router>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
