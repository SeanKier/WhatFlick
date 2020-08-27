import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FaStar } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { api_key } from './APIKEY';

const ActorCredit = ({ credit, profile_path, updateID }) => {
  const { character, id, poster_path, release_date, title, vote_average } = credit;

  const handleClick = () => {
    updateID(id);
  };
  return (
    <div className="actor-credit-item">
      <div className="actor-credit-title">
        <Link
          className="link"
          onClick={handleClick}
          to="/movie"
        >
          {title}
        </Link>
      </div>
      <div>
        <Link
          to="/movie"
          onClick={handleClick}
        >
          { poster_path && (
            <img
              className="actor-img rounded"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={`img for ${title}`}
            />
          )}
          { !poster_path && (
            <img
              className="actor-img rounded"
              src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
              alt={`img for ${title}`}
            />
          )}
        </Link>
      </div>
      <div>
        {character}
      </div>
      <div>
        {moment(Date.parse(release_date)).format('MMMM YYYY')}
      </div>
      <div>
        <FaStar
          color="rgb(255, 215, 0)"
          size={22}
        />
        {vote_average}
        <FaStar
          color="rgb(255, 215, 0)"
          size={22}
        />
      </div>
    </div>
  );
};

ActorCredit.propTypes = {
  credit: PropTypes.shape({
    character: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
  profile_path: PropTypes.string.isRequired,
  updateID: PropTypes.func.isRequired,
};

const ActorView = ({ actorID, updateID }) => {
  const [currentActorCredits, updateActorCredits] = useState([]);
  const [actorDetails, updateDetails] = useState({});

  const getCredits = () => {
    fetch(`https://api.themoviedb.org/3/person/${actorID}/movie_credits?api_key=${api_key}`)
      .then((response) => response.json())
      .then((response) => {
        updateActorCredits(response.cast);
        console.log(response.cast);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetails = () => {
    fetch(`https://api.themoviedb.org/3/person/${actorID}?api_key=${api_key}&language=en-US`)
      .then((response) => response.json())
      .then((response) => {
        updateDetails(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
    getCredits();
  }, []);

  const { name, biography, birthday, deathday, profile_path } = actorDetails;
  currentActorCredits.sort((a, b) => (Date.parse(b.release_date) - Date.parse(a.release_date)));

  const backUpImg = (
    <div className="backup-img actor-img rounded">
      <FontAwesomeIcon
        className="user-icon-actor"
        icon={faUserCircle}
      />
    </div>
  );
  return (
    <div className="actor-view">
      <div className="actor-container">
        <div>
          { profile_path && (
          <img
            className="actor-img rounded"
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            alt={`No image found for ${name}`}
          />
          )}
          { !profile_path && (
            backUpImg
          )}
        </div>
        <div className="actor-bio">
          <div className="cast-title actor-bio-item">
            {name}
          </div>
          <div className="actor-bio-item">
            {biography}
          </div>
        </div>
      </div>
      <div className="actor-credits">
        <div className="credits-title">
          Filmography:
        </div>
        <div className="credits-container">
          {currentActorCredits.map((credit, i) => (
            <ActorCredit key={i} credit={credit} profile_path={profile_path} updateID={updateID} />
          ))}
        </div>
      </div>
    </div>
  );
};

ActorView.propTypes = {
  actorID: PropTypes.number.isRequired,
  updateID: PropTypes.func.isRequired,
};

export default ActorView;
