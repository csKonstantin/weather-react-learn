import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import Layout from '../../../layout/Layout'
import { getWeather, WeatherEntry } from '../weather.api'
import ForecastItemView from './ForecastItemView'
import './ForecastSearchContainer.scss'

export default function ForecastSearchContainer() {
  const [data, setData] = useState<WeatherEntry[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  //const dataInfo = useMemo(() => data ? JSON.stringify(data, null, 2) : null, [data])
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
    <Layout className="forecast-search-container">
      <div>test</div>
    </Layout>
  )
}
