import React from 'react';
import PropTypes from 'prop-types';

import css from '../styles.scss';
import { getWeekday, getDateTimeStr } from '../utils/datetime';


const Index = ({ data, city }) => (
  <ul className={css['widget-container']}>
    {
      data.map(el => (
        <li key={el.dt} className={css.widget}>
          <h2>{getWeekday(el.dt_txt)}</h2>
          <div>{getDateTimeStr(el.dt_txt)}</div>
          <p className={css['widget-desc']}>{el.weather[0].description}</p>
          <div className={css['widget-temp']}>
            <span>{el.main.temp}</span>
            <span>&#8451;</span>
          </div>
          <div className={css['widget-country']}>
            <span>{city.name}</span>
            ,&nbsp;
            <span>{city.country}</span>
          </div>
        </li>
      ))
    }
  </ul>
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
  city: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.number,
  ),
};

Index.defaultProps = {
  data: [],
  city: {},
};

export default Index;
