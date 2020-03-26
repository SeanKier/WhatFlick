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
    this.changeGenre = this.changeGenre.bind(this);
  }

  changeGenre (event) {
    const newGenre = event.target.innerHTML;
    if (newGenre !== this.state.genre) {
      this.setState({
        genre: newGenre
      })
    }
  }
  render() {
    const genres = ['All', 'Action', 'Comedy', 'Documentaries', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
    const { genre, movies, error } = this.state;

    return (
      <div className="wrapper">
        <h1 id="site-title" className="center">Watch Tonight</h1>
        <Navbar options={genres} currentGenre={genre} changeGenre={this.changeGenre} />
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);