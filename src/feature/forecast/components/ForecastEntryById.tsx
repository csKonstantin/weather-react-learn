import { EntityId } from "@reduxjs/toolkit"
import { useAppSelector } from "../../../core/hooks"
import { selectForecastItemById } from "../forecast.selectors"
import ForecastEntry from "./ForecastEntry"


const ForecastEntryById: React.FC<{ id: EntityId }> = ({ id }) => {
  const entry = useAppSelector(state => selectForecastItemById(state, id))

  return <ForecastEntry { ...entry } />
}

export default ForecastEntryById
