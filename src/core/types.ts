export enum LoadingStatus {
  Idle = 'idle',
  Pending = 'pending',
  Done = 'done',
}

export interface ApiResponse<T, E = string> {
  data?: T | null, // eslint-disable-line
  error?: E,
}

export interface ApiResponseStrict<T, E = string> {
  data: T, // eslint-disable-line
  error?: E,
}
