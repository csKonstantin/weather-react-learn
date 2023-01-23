import Card from 'react-bootstrap/Card'
import { ForecastEntity } from '../forecast.types'

import './ForecastEntry.scss'

export default function ForecastEntry ({ icon, description, temp, tempMin, tempMax, displayTime }: ForecastEntity) {
  return (
    <Card>
      <Card.Header as="h5">{displayTime}</Card.Header>
      <Card.Body className="forecast-entry">
        <Card.Img className="forecast-entry__img" src={icon} />
        <Card.Title>{temp}°C</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">from {tempMin}°C to {tempMax}°C</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
