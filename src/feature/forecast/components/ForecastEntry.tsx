import { useMemo } from 'react'
import Card from 'react-bootstrap/Card'
import { ForecastEntity } from '../forecast.types'

import './ForecastEntry.scss'

export type ForecastEntryProps = Omit<ForecastEntity, 'id'>

const ForecastEntry: React.FC<ForecastEntryProps> = ({
  icon,
  description,
  temp,
  tempMin,
  tempMax,
  displayTime,
  rain,
  snow,
}) => {
  const conditions = useMemo(() => {
    const result = []

    if (rain) result.push('rain')
    if (snow) result.push('snow')

    return result.join(' ,')
  }, [rain, snow])

  return (
    <Card className="forecast-entry">
      <Card.Header as="h5">{displayTime}</Card.Header>
      <Card.Body className="forecast-entry__body">
        <Card.Img className="forecast-entry__img" src={icon} />
        <Card.Title>{temp}°C</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {tempMin}°C .. {tempMax}°C
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{conditions}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ForecastEntry
