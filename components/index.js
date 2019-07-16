import React from 'react';
import PropTypes from 'prop-types';

import css from '../styles.scss';

const Index = ({ data }) => (
  <main className={css['main-container']}>
    <ul className={css['widget-container']}>
      {
        data.map(el => (
          <li key={el.dt} className={css.widget}>
            {el.weather[0].description}
          </li>
        ))
      }
    </ul>
  </main>
);

Index.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType(
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(
          PropTypes.string,
          PropTypes.number,
        ),
        PropTypes.objectOf(
          PropTypes.string,
          PropTypes.number,
        ),
      ),
    ),
  ),
};

Index.defaultProps = {
  data: [],
};

export default Index;
