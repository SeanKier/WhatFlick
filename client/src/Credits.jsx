import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CastMember = ({ actor, setActorID }) => {
  const { character, id, name, profile_path } = actor;
  const handleClick = () => {
    setActorID(id);
  };

  return (
    <div className="cast-member">
      <Link
        onClick={handleClick}
        className="link"
        to="/actor"
      >
        <img
          className="actor-img rounded"
          src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
          alt={`Avatar for ${name}`}
        />
      </Link>
      <Link
        onClick={handleClick}
        className="link"
        to="/actor"
      >
        <div>
          {name}
        </div>
      </Link>
      <div>
        {character}
      </div>
    </div>
  );
};

CastMember.propTypes = {
  actor: PropTypes.shape({
    character: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profile_path: PropTypes.string.isRequired,
  }).isRequired,
  setActorID: PropTypes.func.isRequired,
};

const Credits = ({ movieCast, setActorID }) => {
  const firstTwelveActors = movieCast.slice(0, 12);
  return (
    <div className="credits">
      <div className="cast-title">
        Cast:
      </div>
      <div className="credits-container">
        {firstTwelveActors.map((actor, i) => (
          <CastMember key={i} actor={actor} setActorID={setActorID} />
        ))}
      </div>
    </div>
  );
};

Credits.propTypes = {
  movieCast: PropTypes.array.isRequired,
  setActorID: PropTypes.func.isRequired,
};

export default Credits;
