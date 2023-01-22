import { EntityId } from '@reduxjs/toolkit'

export interface HistoryEntity {
  id: string,
  query: string,
  forecast: EntityId[],
}

export interface HistoryState {
  entities: Record<EntityId, HistoryEntity>
  ids: EntityId[]
  query: string
}
