import React from 'react';
import PropTypes from 'prop-types';

const Index = ({ data }) => (
  <React.Fragment>
    <ul>
      {
        data.map(el => (
          <li key={el.dt}>
            {el.weather[0].description}
          </li>
        ))
      }
    </ul>
  </React.Fragment>
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
