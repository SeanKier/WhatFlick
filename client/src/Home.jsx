import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navigation';
import Movies from './Movies';
import Trending from './Trending';
import News from './News';
import { movieDBKey } from './APIKEY';
import MovieContext from './MovieContext';

const Home = ({ subGenres, setSubGenres }) => {
  const [genre, changeGenre] = useState('Now Playing');
  const [movies, updateMovies] = useState([]);
  const [page, nextPage] = useState(1);
  const [currentIndex, changeMovie] = useState(0);

  const { updateMovieID } = useContext(MovieContext);

  const genres = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

  const subGenreMap = {
    All: 0,
    Action: 28,
    Drama: 18,
    War: 10752,
    Family: 10751,
    Animation: 16,
    Comedy: 35,
    Adventure: 12,
    Mystery: 9648,
    Thriller: 53,
    SciFi: 878,
    Fantasy: 14,
    Horror: 27,
    Romance: 10749,
  };

  const fetchMovies = (currentGenre, currentPage, callback) => {
    const options = {
      'Now Playing': 'now_playing',
      Popular: 'popular',
      'Top Rated': 'top_rated',
      Upcoming: 'upcoming',
    };
    let queryString = `https://api.themoviedb.org/3/movie/${options[currentGenre]}?api_key=${movieDBKey}&language=en-US&page=${currentPage}`;
    if (subGenres[0] !== 'All') {
      queryString += `&with_genres=${subGenreMap[subGenres[0]]}`;
    }
    fetch(queryString)
      .then((response) => response.json())
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateDataForGenreChange = (genre) => {
    const updateFeed = (response) => {
      changeGenre(genre);
      updateMovies(response.results);
    };
    fetchMovies(genre, 1, updateFeed);
  };

  const updateNewGenre = (event) => {
    const newGenre = event.target.innerHTML;
    if (newGenre !== genre) {
      updateDataForGenreChange(newGenre);
    }
  };

  const handleNextPage = () => {
    nextPage(page + 1);
  };

  const handleChange = (event) => {
    const newSubGenres = [event.target.value];
    setSubGenres(newSubGenres);
  };

  const getNewPage = (newGenre) => {
    const updateFeed = (response) => {
      changeGenre(newGenre);
      const items = [...movies];
      response.results.forEach((item) => {
        items.push(item);
      });
      updateMovies(items);
    };
    fetchMovies(genre, page, updateFeed);
  };

  useEffect(() => {
    getNewPage(genre);
  }, [page]);

  useEffect(() => {
    updateDataForGenreChange(genre);
  }, [subGenres]);

  return (
    <div className="wrapper">
      <div className="trending-and-news">
        { movies.length > 0 && (
          <Trending
            movies={movies.slice(0, 4)}
            currentIndex={currentIndex}
            changeMovie={changeMovie}
          />
        )}
        <News />
      </div>

      <Navbar options={genres} currentGenre={genre} changeGenre={updateNewGenre} />
      <label className="selector">
        Pick your favorite genre:
        <select value={subGenres[0]} onChange={handleChange}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="War">War</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Adventure">Adventure</option>
          <option value="Mystery">Mystery</option>
          <option value="Thriller">Thriller</option>
          <option value="SciFi">SciFi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
        </select>
      </label>

      <Movies currentMovies={movies.slice(4)} />
      <button
        type="button"
        onClick={handleNextPage}
      >
        .... More Movies ....
      </button>
    </div>
  );
}

Home.propTypes = {
  subGenres: PropTypes.array.isRequired,
  setSubGenres: PropTypes.func.isRequired,
};

export default Home;
