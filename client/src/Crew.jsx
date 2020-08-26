import React from 'react';
import PropTypes from 'prop-types';

const CrewMember = ({ person }) => {
  const { name, job } = person;
  return (
    <div>
      <div>
        {job}:
      </div>
      <div>
        {name}
      </div>
    </div>
  );
};

CrewMember.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
  }).isRequired,
};

const Crew = ({ movieCrew }) => {
  const directorAndWriter = [];
  movieCrew.forEach((person) => {
    if (person.job === 'Screenplay' || person.job === 'Director') {
      directorAndWriter.push(person);
    }
  });
  return (
    <div>
      {directorAndWriter.map((person, i) => (
        <CrewMember key={i} person={person} />
      ))}
    </div>
  );
};

Crew.propTypes = {
  movieCrew: PropTypes.array.isRequired,
};

export default Crew;
