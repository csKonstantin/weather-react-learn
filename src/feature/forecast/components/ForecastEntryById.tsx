import { EntityId } from "@reduxjs/toolkit"
import { memo } from "react"
import { useAppSelector } from "../../../core/hooks"
import { selectForecastItemById } from "../forecast.selectors"
import ForecastEntry from "./ForecastEntry"


const ForecastEntryById: React.FC<{ id: EntityId }> = memo(({ id }) => {
  const entity = useAppSelector(state => selectForecastItemById(state, id))

  const { id: entityId, ...entry } = entity

  return <ForecastEntry { ...entry } />
})

export default ForecastEntryById
