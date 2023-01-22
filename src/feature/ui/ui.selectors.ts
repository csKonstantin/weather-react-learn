import { Status } from './ui.types'
import { RootState } from '../../core/store'

export const selectStatusById = (state: RootState, id: string): Status => { // change to createSelector
	if (!id) return false

	return state.ui.status[id] || false
}
