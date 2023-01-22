import { createSlice } from '@reduxjs/toolkit'
import { StatusType, TypedStatus } from '.'
import { DefaultStatusType, UiState } from './ui.types'

export const initialState: UiState = {
  status: {},
}

export const UI_NAMESPACE = 'ui'

export const uiSlice = createSlice({
  name: UI_NAMESPACE,
  initialState,
  reducers: {
    setStatus(state: UiState, { payload: { key, data = DefaultStatusType }}) {
      state.status[key] = data
    },
    setTypedStatus(state: UiState, { payload: { key, type = DefaultStatusType, data, error }}) {
      state.status[key] = { type, data, error }
    },
    setStatusError(state: UiState, { payload: { key, data, error }}) {
      state.status[key] = { type: StatusType.Error, data, error }
    },
    mergeTypedStatus(state: UiState, { payload: { key, ...part } }) {
      const prevTypedStatus = state.status[key] as TypedStatus<any> || {}
      state.status[key] = { ...prevTypedStatus, ...part }
    },
    typedPending(state: UiState, { payload: key }) {
      state.status[key] = { type: StatusType.Pending, data: null }
    },
    typedIdle(state: UiState, { payload: key }) {
      state.status[key] = { type: StatusType.Idle, data: null }
    },
    startLoading(state: UiState, { payload: key }) {
      state.status[key] = true
    },
    finishLoading(state: UiState, { payload: key }) {
      state.status[key] = false
    },
  },
})

export const uiActions = {
  ...uiSlice.actions,
}

export default uiSlice.reducer
