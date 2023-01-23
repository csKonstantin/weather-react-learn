import { ForecastEntity } from './../forecast/forecast.api'
import { createSelector } from "reselect"
import { RootState } from "../../core/store"
import { StatusType, TypedStatus } from "../ui"

import { forecastEntitySelectors } from './forecast.reducer'

export const {
	selectById: selectForecastItemById,
} = forecastEntitySelectors


export const selectQueryStatus = (state: RootState): TypedStatus<string | undefined> | undefined => {
	if (!state.forecast.query) return { type: StatusType.Idle }

	return state.ui.status[state.forecast.query] as TypedStatus<string | undefined>
}

export const selectQueryForecast = (state: RootState): ForecastEntity[] => {
	if (!state.forecast.query) return []

  if (!state.history.entities[state.forecast.query]) return []

	return state.history.entities[state.forecast.query].forecast.map(id => state.forecast.entities[id])
}

export const selectQuery = createSelector<RootState, string, string>(
  [(state: RootState) => state.forecast.query],
  query => query
)
