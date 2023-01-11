import { useEffect, useMemo, useState } from 'react'
import Layout from '../../../layout/Layout'
import { getWeather } from '../weather.api'

export default function WeatherContainer() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dataInfo = useMemo(() => data ? JSON.stringify(data, null, 2) : null, [data])
  const iconSrc = useMemo(() => data && `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`, [data])

  useEffect(() => {
    setError(null)
    setLoading(true)

    getWeather()
      .then((result) => {
        console.warn('WEATHER RESULT', result)
        setData(result.data)
      })
      .catch((error) => {
        console.warn('WEATHER ERROR', error)
        setError(error.message)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Layout>
      {loading && <div>Loading...</div> }
      {iconSrc && <img src={iconSrc} />}
      {dataInfo && !loading && <pre>{dataInfo}</pre>}
      {error && <div className="error">{error}</div>}
    </Layout>
  )
}
