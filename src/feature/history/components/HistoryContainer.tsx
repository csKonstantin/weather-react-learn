import { useLayoutEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../core/hooks'
import Layout from '../../../layout/Layout'
import { forecastActions } from '../../forecast/forecast.reducer'
import { selectTypedStatusById, StatusType } from '../../ui'
import MainLoader from '../../ui/components/MainLoader'
import TopLoader from '../../ui/components/TopLoader'
import { selectHistoryIds } from '../history.selectors'
import './HistoryContainer.scss'
import HistoryForecastById from './HistoryForecastById'

export default function HistoryContainer() {
  const { id } = useParams<{ id?: string }>()
  const historyItems = useAppSelector(selectHistoryIds)
  const status = useAppSelector(state => selectTypedStatusById(state, id))
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    dispatch(forecastActions.refreshForecastByCityName({ cityName: id }))
  }, [id, dispatch])

  return (
    <Layout>
      <div className="history-container">
        <div className="history-container__query-list">
          <h5>Locations</h5>
          {historyItems.map(id => <NavLink to={`/history/${id}`} key={id}>{id}</NavLink>)}
        </div>
        {id && (
          <div className="history-container__forecast">
            <h5>{id}</h5>
            {status?.type === StatusType.Pending && <MainLoader />}
            <HistoryForecastById id={id} />
          </div>
        )}
      </div>
    </Layout>
  )
}
