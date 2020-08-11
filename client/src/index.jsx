import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import MovieView from './MovieView';
import Home from './Home';
import NewsView from './NewsView';

const App = () => {
  const [currentMovieID, updateMovieID] = useState(0);
  const [subGenres, setSubGenres] = useState(['All']);
  const [currentNewsStory, setCurrentNewsStory] = useState(null);

  return(
    <Router>
      <div>
        <Route
            exact path="/"
            render={(props) => <Home {...props} updateID={updateMovieID} subGenres={subGenres} setSubGenres={setSubGenres} setCurrentNewsStory={setCurrentNewsStory}/>}
        />
        <Route
            path="/other"
            render={(props) => <MovieView {...props} id={currentMovieID} setSubGenres={setSubGenres} />}
        />
        <Route
            path="/news"
            render={(props) => <NewsView {...props} currentNewsStory={currentNewsStory} />}
        />
      </div>
    </Router>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
