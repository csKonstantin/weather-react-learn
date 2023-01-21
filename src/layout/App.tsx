import { Route, Switch } from 'react-router'
import ForecastSearchContainer from '../feature/forecast/components/ForecastSearchContainer'
import HistoryContainer from '../feature/history/components/HistoryContainer'

export default function App() {
  return (
    <Switch>
      <Route path="/history">
        <HistoryContainer />
      </Route>
      <Route path="/">
        <ForecastSearchContainer />
      </Route>
    </Switch>
  )
}
