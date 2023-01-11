import { configureStore, Store } from '@reduxjs/toolkit'
import { routerMiddleware as createRouterMiddleware, connectRouter } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import history from './router'
import rootSaga from './rootSaga'
import { LocationState } from 'history'

const sagaMiddleware = createSagaMiddleware()
const routerMiddleware = createRouterMiddleware(history)

export const store: Store<{
  router: any,
}> = configureStore({
  reducer: {
    router: connectRouter<LocationState>(history),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).prepend(
      sagaMiddleware,
      routerMiddleware,
    ),
  devTools: true,
})

sagaMiddleware
  .run(rootSaga)
  .toPromise()
  .catch((e) => console.error('Saga error', e))

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

