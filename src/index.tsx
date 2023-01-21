import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import 'react-app-polyfill/stable'
import App from './layout/App'
import { store } from './core/store'
import history from './core/router'
import '../src/assets/styles/main.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>
)
