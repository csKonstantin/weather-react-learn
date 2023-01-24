import { selectQueryForecast } from './forecast.selectors'
import { ForecastEntity } from './../forecast/forecast.api'
import { StrictEffect } from "@redux-saga/types"
import { all, call, put, select, takeEvery } from "redux-saga/effects"
import logger from "../../core/logger"
import { getWeatherByCityName } from "../forecast/forecast.api"
import { StatusType, uiActions } from "../ui"
import { forecastActions } from "./forecast.reducer"

export function* refreshForecastByCityName({
  payload: { cityName, force },
}: ReturnType<typeof forecastActions.refreshForecastByCityName>): Generator<StrictEffect, any, any> {
  const statusKey = cityName

  try {
    const cashed = yield select(selectQueryForecast)

    if (!force && cashed.length) {
      yield put(uiActions.setTypedStatus({ key: statusKey, type: StatusType.Success }))
      return
    }

    yield put(uiActions.setTypedStatus({ key: statusKey, type: StatusType.Pending }))

    const forecastItems: ForecastEntity[] = yield call(getWeatherByCityName, { cityName })

    logger.debug('getWeatherByCityName forecastItems:', forecastItems)

    yield put(forecastActions.forecastReceived({
      id: cityName,
      query: cityName,
      forecast: forecastItems,
    }))

    yield put(uiActions.setTypedStatus({ key: statusKey, type: StatusType.Success }))
  } catch (e) {
    logger.error('refreshForecastByCityName error:', e)
    yield put(uiActions.setTypedStatus({ key: statusKey, type: StatusType.Error }))
  }
}

export function* rootForecastSaga() {
  yield all([
    takeEvery(forecastActions.refreshForecastByCityName, refreshForecastByCityName),
  ])
}
