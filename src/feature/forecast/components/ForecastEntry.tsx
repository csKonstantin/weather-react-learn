import Card from 'react-bootstrap/Card'
import { ForecastEntity } from '../forecast.types'

import './ForecastEntry.scss'

export default function ForecastEntry({
  icon,
  description,
  temp,
  tempMin,
  tempMax,
  displayTime,
  rain,
  snow,
}: ForecastEntity) {
  return (
    <Card>
      <Card.Header as="h5">{displayTime}</Card.Header>
      <Card.Body className="forecast-entry">
        <Card.Img className="forecast-entry__img" src={icon} />
        <Card.Title>{temp}°C</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {tempMin}°C .. {tempMax}°C
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {rain && <span>rain</span>}
          {snow && <span>snow</span>}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}
