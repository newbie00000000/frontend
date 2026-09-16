import { http } from '../lib/http'
import type { LoginPayload, LoginResponse, SignupPayload, User } from '../types/auth'

export function signup(payload: SignupPayload) {
  return http.post<void>('/api/auth/signup', payload)
}

export function login(payload: LoginPayload) {
  return http.post<LoginResponse>('/api/auth/login', payload)
}

export function logout() {
  return http.post<void>('/api/auth/logout')
}

export function fetchMe() {
  return http.get<User>('/api/users/me')
}
