import moment from 'moment'
import OpenWeatherMap from 'openweathermap-ts'
import { ThreeHourResponse } from 'openweathermap-ts/dist/types'
import { response } from 'express'

export const GET_WEATHER_DEFAULT_PARAMS = {
  // Minsk default
  // lat: 53.901525,
  // lon: 27.554245,
  q: 'Minsk',
  appid: '09f1bb52d69d32208b03117eb9c45a1e', // https://home.openweathermap.org/api_keys
  units: 'metric',
  lang: 'ru'
}

const openWeather = new OpenWeatherMap({
  apiKey: '09f1bb52d69d32208b03117eb9c45a1e',
  units: 'metric',
  language: 'ru',
})

type WeatherResponseItem = {
  dt: number;
  main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
  };
  weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
  }[];
  clouds: {
      all: number;
  };
  wind: {
      speed: number;
      deg: number;
  };
  sys: {
      pod: string;
  };
  dt_txt: string;
  rain?: undefined;
  snow?: undefined;
}

export interface WeatherEntry {
  timestamp: number,
  temp: number,
  tempMin: number,
  tempMax: number,
  icon: string,
  description: string,
  displayTime: string,
  rain?: boolean,
  snow?: boolean,
}

export const normalizeWeatherResponse = (response: ThreeHourResponse): Array<WeatherEntry> =>
  response.list.map(item => {
    const {
      dt: timestamp,
      main: {
        temp,
        temp_max: tempMax,
        temp_min: tempMin
      },
      weather
    } = item

    const icon = item.weather[0].icon

    return {
      timestamp,
      temp,
      tempMax,
      tempMin,
      icon: icon && `http://openweathermap.org/img/wn/${icon}@2x.png`,
      displayTime: moment.unix(timestamp).format('LLL'),
      description: '',
    }
  })

export const getWeather = async (params?: any): Promise<Array<WeatherEntry>> => {
  const urlParams = params ?
    Object.assign({}, GET_WEATHER_DEFAULT_PARAMS, params) :
    GET_WEATHER_DEFAULT_PARAMS

  const queryString = new URLSearchParams(urlParams).toString()

  const url = `https://api.openweathermap.org/data/2.5/weather?${queryString}`

  return openWeather.getThreeHourForecastByCityName({ cityName: 'Minsk' })
    .then(normalizeWeatherResponse)
  //return api.get(url)
}

