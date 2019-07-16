import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import css from '../styles.scss';
import { fetchWeather as fetchWeatherAction } from '../actions/weather';
import { getHour, getHourMin } from '../utils/datetime';
import Weather from '../components/index';
import Panel from '../components/Panel';

class Index extends React.Component {
  static propTypes = {
    forecastData: PropTypes.objectOf(
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
    fetchWeather: PropTypes.func,
  }

  static defaultProps = {
    forecastData: [],
    fetchWeather: () => {},
  }

  state = {
    selectedFilter: '3h',
  }

  componentDidMount() {
    this.init();
  }

  onRadioInputChange = (ev) => {
    if (!(ev.target instanceof HTMLElement)) return;
    this.setState({ selectedFilter: ev.target.value });
  }

  getWeatherData = () => {
    const { forecastData: { list } } = this.props;
    const { selectedFilter } = this.state;
    if (!list) return [];
    if (selectedFilter === '3h') return list;
    return list.filter(el => selectedFilter === getHour(el.dt_txt).toLowerCase()) || [];
  }

  getDateTimeCollection = () => {
    const { forecastData: { list } } = this.props;
    return list && list.reduce((acc, cur) => {
      const key = getHour(cur.dt_txt).toLowerCase();
      if (!acc[key]) acc[key] = getHourMin(cur.dt_txt);
      return acc;
    }, {});
  }

  async fetch() {
    const { fetchWeather } = this.props;
    const { lat, lon } = this.state;
    await fetchWeather(lat, lon);
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
    const { selectedFilter } = this.state;
    return (
      <main className={css['main-container']}>
        <Weather
          data={this.getWeatherData()}
          city={forecastData.city}
        />
        <Panel
          onRadioInputChange={this.onRadioInputChange}
          selectedFilter={selectedFilter}
          labels={this.getDateTimeCollection()}
        />
      </main>
    );
  }
}

export default connect(({ forecastData }) => ({
  forecastData,
}), {
  fetchWeather: fetchWeatherAction,
})(Index);
