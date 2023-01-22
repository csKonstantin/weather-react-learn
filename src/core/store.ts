import { ForecastState } from './../feature/forecast/forecast.types'
import { UiState } from './../feature/ui/ui.types'
import { HistoryState } from './../feature/history/history.types'
import { configureStore, Store } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import historyReducer from '../feature/history/history.reducer'
import uiReducer from '../feature/ui/ui.reducer'
import forecastReducer from '../feature/forecast/forecast.reducer'

const sagaMiddleware = createSagaMiddleware()

export const store: Store<{
  history: HistoryState,
  forecast: ForecastState,
  ui: UiState,
}> = configureStore({
  reducer: {
    history: historyReducer,
    forecast: forecastReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).prepend(
      sagaMiddleware,
    ),
  devTools: true,
})

sagaMiddleware
  .run(rootSaga)
  .toPromise()
  .catch((e) => console.error('Saga error', e))

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

