import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const NavBar = ({ options, currentGenre, changeGenre }) => (
  <ul className="navbar">
    {options.map((genre, i) => (
      <li
        key={i}
        className="navbar-item"
      >
        <button
          type="button"
          className={classnames(
            'btn-clear nav-link',
            { active: genre === currentGenre }
          )}
          onClick={changeGenre}
        >
          {genre}
        </button>
      </li>
    ))}
  </ul>
);

NavBar.propTypes = {
  options: PropTypes.array.isRequired,
  currentGenre: PropTypes.string.isRequired,
  changeGenre: PropTypes.func.isRequired,
};

export default NavBar;
