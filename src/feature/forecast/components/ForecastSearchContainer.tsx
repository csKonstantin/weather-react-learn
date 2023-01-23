import Layout from '../../../layout/Layout'
import Form from 'react-bootstrap/Form'
import { useAppDispatch, useAppSelector } from '../../../core/hooks'
import { forecastActions } from '../forecast.reducer'
import debounce from 'lodash/debounce'
import { selectQuery, selectQueryForecast, selectQueryStatus } from '../forecast.selectors'
import MainLoader from '../../ui/components/MainLoader'
import { StatusType } from '../../ui'
import '../../forecast/components/ForecastSearchContainer.scss'
import ForecastEntry from './ForecastEntry'
import HistoryForecastById from '../../history/components/HistoryForecastById'

export default function ForecastSearchContainer() {
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectQueryStatus)
  const query = useAppSelector(selectQuery)

  const onSearchChange = debounce((e) => {
    const cityName = e.target.value.trim()

    console.warn('onSearchChange', cityName)
    dispatch(forecastActions.setQuery(cityName))

    if (!cityName) return

    dispatch(forecastActions.refreshForecastByCityName({ cityName }))
  }, 500)

  return (
    <Layout className="forecast-search-container">
      <Form.Group className="mb-3">
        <Form.Label>Enter city name</Form.Label>
        <Form.Control type="text" placeholder="city name" defaultValue={query} onChange={onSearchChange} />
      </Form.Group>
      {status?.type === StatusType.Pending && <MainLoader />}
      {query && <HistoryForecastById id={query} className="forecast-search-container__list" /> }
    </Layout>
  )
}
