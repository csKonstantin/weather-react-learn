import './WeatherItemView.scss'
import { WeatherEntry } from '../weather.api'


export default function WeatherItemView ({ icon, description, temp, tempMin, tempMax, displayTime }: WeatherEntry) {
  return (
    <div className='weather-entry'>
      <div>{displayTime}</div>
      <img src={icon} />
      <div>{description}</div>
      <div>{temp}°C</div>
      <div>{tempMin}°C</div>
      <div>{tempMax}°C</div>
    </div>
  )
}
