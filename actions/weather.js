import types from './types';
import { get } from '../utils/request';

const API_PATH = 'https://api.openweathermap.org/data/2.5/forecast?';
const APP_ID = '81a26fa8a34968e47fc164ca9ba3f439';

export const fetchWeather = (lat, lon) => async (dispatch) => {
  dispatch({ type: types.FETCH_WEATHER });
  const data = await get(`${API_PATH}lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric`);
  if (data.cod === '200') {
    dispatch({ data, type: types.FETCH_WEATHER_SUCCESS });
  } else {
    dispatch({ type: types.FETCH_WEATHER_FAILED });
  }
};

export default {
  fetchWeather,
};
