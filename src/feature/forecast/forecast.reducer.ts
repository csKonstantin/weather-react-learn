import { ForecastEntity } from './forecast.api'
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { ForecastState } from './forecast.types'
import { historyActions } from '../history/history.reducer'

export const initialState: ForecastState = {
  entities: {},
  ids: [],
}

const NAMESPACE = 'history'
const adapter = createEntityAdapter<ForecastEntity>()

export const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
		builder
			.addCase(historyActions.forecastReceived, (state, { payload: { forecast }}) => {
				adapter.upsertMany(state, forecast)
			})
		}
})

export const forecastActions = {
  ...slice.actions,
}

export default slice.reducer
