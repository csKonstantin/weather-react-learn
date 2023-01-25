import { forecastActions } from './../forecast/forecast.reducer'
import { createSlice, createAction, createEntityAdapter } from '@reduxjs/toolkit'
import { HistoryState, HistoryEntity } from './history.types'
import { RootState } from '../../core/store'

export const initialState: HistoryState = {
  entities: {
    'Minsk': {
      id: 'Minsk',
      query: 'Minsk',
      forecast: [],
    },
    'Moscow': {
      id: 'Moscow',
      query: 'Moscow',
      forecast: [],
    },
  },
  ids: ['Minsk', 'Moscow'],
}

const NAMESPACE = 'history'
const adapter = createEntityAdapter<HistoryEntity>()

export const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
		builder
			.addCase(forecastActions.forecastReceived, (state, { payload: { id, query, forecast }}) => {
        adapter.upsertOne(state, { id, query, forecast: forecast.map(f => f.id)})
			})
		}
})

export const historyActions = {
  ...slice.actions,
	refreshForecastByCityName: createAction<{ cityName: string }>(`${NAMESPACE}/refreshForecastByCityName`),
}

export const historyEntitySelectors = adapter.getSelectors<RootState>(
  (state) => state.history,
)

export default slice.reducer
