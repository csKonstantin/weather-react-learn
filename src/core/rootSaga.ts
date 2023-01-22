import { all, fork } from 'redux-saga/effects'
import { rootHistorySaga } from '../feature/history/history.saga'

function* rootSaga() {
  yield all([
    fork(rootHistorySaga),
  ])
}

export default rootSaga
