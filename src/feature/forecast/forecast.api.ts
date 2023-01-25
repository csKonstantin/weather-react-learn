import { ApiResponse } from './../../core/types'
import { EntityId } from '@reduxjs/toolkit'
import moment from 'moment'
import OpenWeatherMap from 'openweathermap-ts'
import { ThreeHourResponse } from 'openweathermap-ts/dist/types'

export const GET_WEATHER_DEFAULT_PARAMS = {
  cityName: 'Minsk',
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
} | {
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
  rain: {
      '3h': number;
  };
  sys: {
      pod: string;
  };
  dt_txt: string;
  snow?: undefined;
} | {
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
  rain: {
      '3h': number;
  };
  snow: {
      '3h': number;
  };
  sys: {
      pod: string;
  };
  dt_txt: string;
} | {
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
  rain: {
      '3h'?: undefined;
  };
  snow: {
      '3h'?: undefined;
  };
  sys: {
      pod: string;
  };
  dt_txt: string;
};

export interface ForecastEntity {
  id: EntityId,
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

export const normalizeForecastResponse = (response: ThreeHourResponse, query: string): Array<ForecastEntity> =>
  response.list.map(item => {
    const {
      dt: timestamp,
      main: {
        temp,
        temp_max: tempMax,
        temp_min: tempMin
      },
      weather,
      rain,
      snow,
    } = item as WeatherResponseItem

    const icon = weather[0].icon

    return {
      id: `${query}${timestamp}`,
      timestamp,
      temp,
      tempMax,
      tempMin,
      icon: icon && `http://openweathermap.org/img/wn/${icon}@2x.png`,
      displayTime: moment.unix(timestamp).format('MMMM DD, HH:mm'),
      description: '',
      historyId: query,
      rain: !!rain,
      snow: !!snow,
    }
  })

export const getWeatherByCityName = async (params?: any): Promise<ApiResponse<ForecastEntity[]>> => {
  const apiParams = params ?
    Object.assign({}, GET_WEATHER_DEFAULT_PARAMS, params) :
    GET_WEATHER_DEFAULT_PARAMS

  return openWeather.getThreeHourForecastByCityName(apiParams)
    .then((response) => {
      if (Number(response.cod) === 404) {
        return { error: 'City wasn\'t found' }
      }
      return { data: normalizeForecastResponse(response, params.cityName) }
    })
}

