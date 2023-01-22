import { ForecastEntity } from './../forecast/forecast.api'
import { createSelector } from "reselect"
import { RootState } from "../../core/store"
import { StatusType, TypedStatus } from "../ui"


export const selectQueryStatus = (state: RootState): TypedStatus<string | undefined> | undefined => {
	if (!state.history.query) return { type: StatusType.Idle }

	return state.ui.status[state.history.query] as TypedStatus<string | undefined>
}

export const selectQueryForecast = (state: RootState): ForecastEntity[] => {
	if (!state.history.query) return []

  if (!state.history.entities[state.history.query]) return []

	return state.history.entities[state.history.query].forecast.map(id => state.forecast.entities[id])
}

export const selectQuery = createSelector<RootState, string, string>(
  [(state: RootState) => state.history.query],
  query => query
)
