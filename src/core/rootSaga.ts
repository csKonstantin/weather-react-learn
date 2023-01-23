import { all, fork } from 'redux-saga/effects'
import { rootForecastSaga } from '../feature/forecast/forecast.saga'

function* rootSaga() {
  yield all([
    fork(rootForecastSaga),
  ])
}

export default rootSaga
