export interface User {
  id: number
  email: string
  nickname: string
}

export interface SignupPayload {
  email: string
  password: string
  nickname: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: User
}

export interface RefreshResponse {
  accessToken: string
}

export type ApiErrorCode =
  | 'AUTH_EMAIL_DUPLICATE'
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_TOKEN_EXPIRED'
  | 'AUTH_TOKEN_INVALID'
  | 'VALIDATION_ERROR'

export interface ApiErrorBody {
  code?: ApiErrorCode
  message?: string
}
