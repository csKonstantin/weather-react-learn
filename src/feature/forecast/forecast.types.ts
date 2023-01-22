import { EntityId } from '@reduxjs/toolkit'

export interface ForecastEntity {
  id: EntityId,
  timestamp: number,
  temp: number,
  tempMin: number,
  tempMax: number,
  icon: string,
  description: string,
  displayTime: string,
  rain?: boolean,
  snow?: boolean,
}


export interface ForecastState {
  entities: Record<EntityId, ForecastEntity>
  ids: EntityId[]
}
