import { NavLink, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../core/hooks'
import Layout from '../../../layout/Layout'
import { selectHistoryIds } from '../history.selectors'
import './HistoryContainer.scss'
import HistoryForecastById from './HistoryForecastById'

export default function HistoryContainer() {
  const { id } = useParams<{ id?: string }>()
  const historyItems = useAppSelector(selectHistoryIds)

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
            <HistoryForecastById id={id} />
          </div>
        )}
      </div>
    </Layout>
  )
}
