import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchWeather as fetchWeatherAction } from '../actions/weather';
import IndexComponent from '../components/index';

class Index extends React.Component {
  static propTypes = {
    forecastData: PropTypes.arrayOf(
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
    fetchWeather: PropTypes.func,
  }

  static defaultProps = {
    forecastData: [],
    fetchWeather: () => {},
  }

  componentDidMount() {
    this.init();
  }

  fetch() {
    const { fetchWeather } = this.props;
    const { lat, lon } = this.state;
    fetchWeather(lat, lon);
  }

  init() {
    // Try HTML5 geolocation.
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }, () => this.fetch());
      });
    } else {
      // Browser doesn't support Geolocation
    }
  }

  render() {
    const { forecastData } = this.props;
    return <IndexComponent data={forecastData} />;
  }
}

export default connect(({ forecastData }) => ({
  forecastData,
}), {
  fetchWeather: fetchWeatherAction,
})(Index);
