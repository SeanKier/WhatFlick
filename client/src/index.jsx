import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import MovieView from './MovieView';
import Home from './Home';

const App = () => {
  const [currentMovieID, updateMovieID] = useState(0);

  return(
    <Router>
      <div>
        <Route
            exact path="/"
            render={(props) => <Home {...props} updateID={updateMovieID}/>}
        />
        <Route
            path="/other"
            render={(props) => <MovieView {...props} id={currentMovieID} />}
        />
      </div>
    </Router>
  );
};
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
