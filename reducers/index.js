import types from '../actions/types';

export const INITIAL_STATE = {
  forecastData: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        forecastData: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
