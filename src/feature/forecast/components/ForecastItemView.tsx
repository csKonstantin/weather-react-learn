import { ForecastEntity } from '../forecast.types'
import './ForecastItemView.scss'

export default function ForecastItemView ({ icon, description, temp, tempMin, tempMax, displayTime }: ForecastEntity) {
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
