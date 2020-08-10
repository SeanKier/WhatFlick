import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import MovieView from './MovieView';
import Home from './Home';

const App = () => {
  const [currentMovieID, updateMovieID] = useState(0);
  const [currentMovieGenres, seeMoreGenres] = useState([]);
  const [subGenres, setSubGenres] = useState(['All']);

  return(
    <Router>
      <div>
        <Route
            exact path="/"
            render={(props) => <Home {...props} updateID={updateMovieID} subGenres={subGenres} setSubGenres={setSubGenres} />}
        />
        <Route
            path="/other"
            render={(props) => <MovieView {...props} id={currentMovieID} seeMoreGenres={seeMoreGenres} />}
        />
      </div>
    </Router>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
