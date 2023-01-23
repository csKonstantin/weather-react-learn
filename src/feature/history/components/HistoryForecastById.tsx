import { EntityId } from "@reduxjs/toolkit"
import classNames from "classnames"
import { useAppSelector } from "../../../core/hooks"
import ForecastEntryById from "../../forecast/components/ForecastEntryById"
import { selectHistoryItemById } from "../history.selectors"
import './HistoryForecastById.scss'


const HistoryForecastById: React.FC<{ id: EntityId, className?: string }> = ({ id, className }) => {
  const entry = useAppSelector(state => selectHistoryItemById(state, id))

  if (!entry) return null

  return (
    <div className={classNames({
      "history-forecast": true,
      [className]: className,
    })}>
      {entry.forecast.map(id => <ForecastEntryById id={id} key={id} />)}
    </div>
  )
}

export default HistoryForecastById
