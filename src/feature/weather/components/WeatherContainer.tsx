import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import Layout from '../../../layout/Layout'
import { getWeather, WeatherEntry } from '../weather.api'
import WeatherItemView from './WeatherItemView'
import './WeatherContainer.scss'

export default function WeatherContainer() {
  const [data, setData] = useState<WeatherEntry[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dataInfo = useMemo(() => data ? JSON.stringify(data, null, 2) : null, [data])
  //const iconSrc = useMemo(() => data && `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`, [data])

  useEffect(() => {
    setError(null)
    setLoading(true)

    getWeather()
      .then((result) => {
        setData(result)
        console.warn(result)
      })
      .catch((error) => {
        setError(error.message)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Layout className="weather-container">
      {loading && <div>Loading...</div> }
      <div className="weather-container__list">{data && data.map(entry => <WeatherItemView { ...entry } />)}</div>
      {error && <div className="error">{error}</div>}
    </Layout>
  )
}
