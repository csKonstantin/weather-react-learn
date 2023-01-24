import { RootState } from './../../core/store'
import { ForecastEntity } from './forecast.api'
import { createSlice, createAction, createEntityAdapter } from '@reduxjs/toolkit'
import { ForecastState } from './forecast.types'

export const initialState: ForecastState = {
  entities: {},
  ids: [],
  query: '',
}

const adapter = createEntityAdapter<ForecastEntity>()

const NAMESPACE = 'forecast'

export const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setQuery(state: ForecastState, { payload: query }) {
      state.query = query
    },
    forecastReceived(state: ForecastState, { payload: { forecast } }) {
      adapter.upsertMany(state, forecast)
    },
    test(state: ForecastState) {
      adapter.updateOne(state, {
        id: "Minsk1674572400",
        changes: {
          description: 'Vasya',
          snow: true,
          rain: true,
        }
      })
    },
  },
})

export const forecastActions = {
  ...slice.actions,
  refreshForecastByCityName: createAction<{ cityName: string; force?: boolean }>(
    `${NAMESPACE}/refreshForecastByCityName`
  ),
}

export const forecastEntitySelectors = adapter.getSelectors<RootState>((state) => state.forecast)

export default slice.reducer
