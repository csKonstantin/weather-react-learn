import * as api from '../../core/api'

export const GET_WEATHER_DEFAULT_PARAMS = {
  // Minsk default
  // lat: 53.901525,
  // lon: 27.554245,
  q: 'Minsk',
  appid: '09f1bb52d69d32208b03117eb9c45a1e', // https://home.openweathermap.org/api_keys
  units: 'metric',
  lang: 'ru'
}
export const getWeather = (params?: any) => {
  const urlParams = params ?
    Object.assign({}, GET_WEATHER_DEFAULT_PARAMS, params) :
    GET_WEATHER_DEFAULT_PARAMS

  const queryString = new URLSearchParams(urlParams).toString()

  const url = `https://api.openweathermap.org/data/2.5/weather?${queryString}`

  return api.get(url)
}

