import Layout from '../../../layout/Layout'
import Form from 'react-bootstrap/Form'
import { useAppDispatch, useAppSelector } from '../../../core/hooks'
import { historyActions } from '../history.reducer'
import debounce from 'lodash/debounce'
import { selectQuery, selectQueryForecast, selectQueryStatus } from '../history.selectors'
import MainLoader from '../../ui/components/MainLoader'
import { StatusType } from '../../ui'
import ForecastItemView from '../../forecast/components/ForecastItemView'
import '../../forecast/components/ForecastSearchContainer.scss'

export default function HistoryContainer() {
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectQueryStatus)
  const query = useAppSelector(selectQuery)
  const forecastItems = useAppSelector(selectQueryForecast)

  const onSearchChange = debounce((e) => {
    const cityName = e.target.value.trim()

    console.warn('onSearchChange', cityName)
    dispatch(historyActions.setQuery(cityName))

    if (!cityName) return

    dispatch(historyActions.refreshForecastByCityName({ cityName }))
  }, 500)

  return (
    <Layout className="forecast-search-container">
      <div>
        <Form.Group className="mb-3">
          <Form.Label>Enter city name</Form.Label>
          <Form.Control type="text" placeholder="city name" defaultValue={query} onChange={onSearchChange} />
        </Form.Group>
        {status?.type === StatusType.Pending && <MainLoader />}
        <div className="forecast-search-container__list">
          {forecastItems.map(entry => <ForecastItemView key={entry.id} { ...entry } />)}
        </div>
      </div>
    </Layout>
  )
}
