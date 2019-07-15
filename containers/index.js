import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchWeather as fetchWeatherAction } from '../actions/weather';
import IndexComponent from '../components/index';

class Index extends React.Component {
  static propTypes = {
    fetchWeather: PropTypes.func,
  }

  static defaultProps = {
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
    if (window.navigator.geolocation) {
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
    return <IndexComponent />;
  }
}

export default connect(null, {
  fetchWeather: fetchWeatherAction,
})(Index);
