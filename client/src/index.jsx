import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navigation';
import Movies from './Movies';
import api_key from './APIKEY';

const App = (props) => {
  const [genre, changeGenre] = useState('Now Playing');
  const [movies, updateMovies] = useState([]);
  const [page, nextPage] = useState(1);

  const updateNewGenre = (event) => {

    const newGenre = event.target.innerHTML;
    if (newGenre !== genre) {
      getData(newGenre);
    }
  }
  useEffect(() => {
    getData(genre);
  }, [page]);

  const handleNextPage = () => {
    nextPage(page + 1);
  }

  const getData = (newGenre) => {

    const options = {
      'Now Playing': 'now_playing',
      'Popular': 'popular',
      'Top Rated': 'top_rated',
      'Upcoming': 'upcoming'
    }

    if (newGenre === genre) {
      fetch(`https://api.themoviedb.org/3/movie/${options[genre]}?api_key=${api_key}&language=en-US&page=${page}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        changeGenre(newGenre);
        const items = movies.slice();
        response.results.forEach((item)=> {
          items.push(item);
        })
        updateMovies(items);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      fetch(`https://api.themoviedb.org/3/movie/${options[newGenre]}?api_key=${api_key}&language=en-US&page=1`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log('hellofdjfpkdfjdslkfjdslk;g', response.results)
        changeGenre(genre);
        updateMovies(response.results);
      })
      .catch(err => {
        console.log(err);
      });
    }

  }

  const genres = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

  return (
    <div className="wrapper">
      <h1 id="site-title" className="center">Watch Tonight</h1>
      <Navbar options={genres} currentGenre={genre} changeGenre={updateNewGenre} />
      <Movies currentMovies={movies}/>
      <button
        onClick={handleNextPage}
      >
        .... More Movies ....
      </button>
    </div>
  );
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);