import Layout from '../../../layout/Layout'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { useAppDispatch, useAppSelector } from '../../../core/hooks'
import { forecastActions } from '../forecast.reducer'
import debounce from 'lodash/debounce'
import { selectQuery, selectQueryStatus } from '../forecast.selectors'
import MainLoader from '../../ui/components/MainLoader'
import { StatusType } from '../../ui'
import '../../forecast/components/ForecastSearchContainer.scss'
import HistoryForecastById from '../../history/components/HistoryForecastById'
import { useCallback } from 'react'

export default function ForecastSearchContainer() {
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectQueryStatus)
  const query = useAppSelector(selectQuery)

  const refreshCurrent = useCallback(() => {
    dispatch(forecastActions.refreshForecastByCityName({ cityName: query, force: true }))
  }, [dispatch, query])

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
        <InputGroup className="mb-3">
          {/* <Form.Label>Enter city name</Form.Label> */}
          <Form.Control type="text" placeholder="city name" defaultValue={query} onChange={onSearchChange} />
          <Button variant="outline-secondary" onClick={refreshCurrent}>Refresh</Button>
        </InputGroup>
      </Form.Group>
      {status?.type === StatusType.Pending && <MainLoader />}
      {query && <HistoryForecastById id={query} className="forecast-search-container__list" /> }
    </Layout>
  )
}
