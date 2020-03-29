import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navigation';
import Movies from './Movies';
import api_key from './APIKEY';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      genre: 'Now Playing',
      movies: [],
      error: null
    };
    this.changeGenre = this.changeGenre.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.genre);
  }

  getData (genre) {
    const options = {
      'Now Playing': 'now_playing',
      'Popular': 'popular',
      'Top Rated': 'top_rated',
      'Upcoming': 'upcoming'
    }
    fetch(`https://api.themoviedb.org/3/movie/${options[genre]}?api_key=${api_key}&language=en-US&page=1`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          genre: genre,
          movies: response.results
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeGenre(event) {
    const newGenre = event.target.innerHTML;
    if (newGenre !== this.state.genre) {
      this.getData(newGenre);
    }
  }
  render() {
    const genres = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];
    const { genre, movies, error } = this.state;

    return (
      <div className="wrapper">
        <h1 id="site-title" className="center">Watch Tonight</h1>
        <Navbar options={genres} currentGenre={genre} changeGenre={this.changeGenre} />
        <Movies currentMovies={movies}/>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);