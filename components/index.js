import React from 'react';
import PropTypes from 'prop-types';

import css from '../styles.scss';
import { getWeekday, getDateTimeStr } from '../utils/datetime';


const Index = ({ data }) => (
  <main className={css['main-container']}>
    <ul className={css['widget-container']}>
      {
        data.list && data.list.map(el => (
          <li key={el.dt} className={css.widget}>
            <h2>{getWeekday(el.dt_txt)}</h2>
            <div>{getDateTimeStr(el.dt_txt)}</div>
            <p className={css['widget-desc']}>{el.weather[0].description}</p>
            <div className={css['widget-temp']}>
              <span>{el.main.temp}</span>
              <span>&#8451;</span>
            </div>
            <div className={css['widget-country']}>
              <span>{data.city.name}</span>
              ,&nbsp;
              <span>{data.city.country}</span>
            </div>
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
