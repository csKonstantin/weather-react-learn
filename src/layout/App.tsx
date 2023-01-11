import { Route, Switch } from 'react-router-dom'
import WeatherContainer from '../feature/weather/components/WeatherContainer'

export default function App() {
  return (
    <Switch>
      <Route path="/">
        <WeatherContainer />
      </Route>
    </Switch>
  )
}
