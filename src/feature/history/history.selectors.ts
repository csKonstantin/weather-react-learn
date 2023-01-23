import { historyEntitySelectors } from './history.reducer'

export const {
	selectById: selectHistoryItemById,
	selectIds: selectHistoryIds,
	selectAll: selectHistoryItems,
} = historyEntitySelectors
