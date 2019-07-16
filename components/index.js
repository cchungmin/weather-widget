import React from 'react';
import PropTypes from 'prop-types';

import css from '../styles.scss';

const Index = ({ data }) => (
  <main className={css['main-container']}>
    <ul className={css['widget-container']}>
      {
        data.list && data.list.map(el => (
          <li key={el.dt} className={css.widget}>
            <h2>{new Date(el.dt_txt).getDay()}</h2>
            <div>{el.weather[0].description}</div>
          </li>
        ))
      }
    </ul>
  </main>
);

Index.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
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
  ),
};

Index.defaultProps = {
  data: [],
};

export default Index;
