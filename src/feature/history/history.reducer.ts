import { createSlice, createAction, createEntityAdapter } from '@reduxjs/toolkit'
import { HistoryState, HistoryEntity } from './history.types'

export const initialState: HistoryState = {
  entities: {},
  ids: [],
  query: '',
}

const HISTORY_NAMESPACE = 'history'
const adapter = createEntityAdapter<HistoryEntity>()

export const slice = createSlice({
  name: HISTORY_NAMESPACE,
  initialState,
  reducers: {
    forecastReceived(state: HistoryState, { payload: { id, query, forecast }}) {
      adapter.upsertOne(state, { id, query, forecast: forecast.map(f => f.id)})
    },
    setQuery(state: HistoryState, { payload: query}) {
      state.query = query
    },
  },
})

export const historyActions = {
  ...slice.actions,
	refreshForecastByCityName: createAction<{ cityName: string }>(`${HISTORY_NAMESPACE}/refreshForecastByCityName`),
}

export default slice.reducer
