import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navigation';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      genre: 'All',
      movies: [],
      error: null
    };

  }

  render() {
    const genres = ['All', 'Action', 'Comedy', 'Documentaries', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
    const { genre, movies, error } = this.state;

    return (
      <div className="wrapper">
        <h1 id="site-title" className="center">Watch Tonight</h1>
        <Navbar options={genres}/>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);