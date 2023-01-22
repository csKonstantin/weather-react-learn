export interface TypedStatus<T> {
  type: StatusType,
  data?: T,
  error?: string,
}

export enum StatusType {
	Pending = 'pending',
	Idle = 'idle',
	Success = 'success',
	Error = 'error',
}

export const DefaultStatusType = StatusType.Idle

export type Status = TypedStatus<any> | StatusType | boolean

export interface UiState {
  status: Record<string, Status>
}

export enum ErrorTypes {
	NoAuth = 'AuthenticationError'
}
