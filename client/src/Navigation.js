import React from 'react';
import PropTypes from 'prop-types';
// todo: use classnames to highlight slected genre
// import classnames from 'classnames';

const NavBar = ({ options }) => (
  <ul>
    {options.map((genre) =>
      <li key={genre}>
        <button className='btn-clear nav-link'>
          {genre}
        </button>
      </li>
    )}
  </ul>
);

export default NavBar;