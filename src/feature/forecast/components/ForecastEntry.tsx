import { ForecastEntity } from '../forecast.types'
import './ForecastEntry.scss'

export default function ForecastEntry ({ icon, description, temp, tempMin, tempMax, displayTime }: ForecastEntity) {
  return (
    <div className='forecast-entry'>
      <div>{displayTime}</div>
      <img src={icon} />
      <div>{description}</div>
      <div>{temp}°C</div>
      <div>{tempMin}°C</div>
      <div>{tempMax}°C</div>
    </div>
  )
}
