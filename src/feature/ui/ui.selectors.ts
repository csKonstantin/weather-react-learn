import { Status, StatusType, TypedStatus } from './ui.types'
import { RootState } from '../../core/store'

export const selectStatusById = (state: RootState, id: string): Status => {
  if (!id) return false

  return state.ui.status[id] || false
}

export const selectTypedStatusById = (state: RootState, id: string): TypedStatus<string | undefined> => {
  if (!id || !state.ui.status[id]) return { type: StatusType.Idle }

  return state.ui.status[id] as TypedStatus<string | undefined>
}
