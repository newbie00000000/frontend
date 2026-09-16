import { AxiosError } from 'axios'
import type { ApiErrorBody, ApiErrorCode } from '../types/auth'

const ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  AUTH_EMAIL_DUPLICATE: '이미 가입된 이메일입니다.',
  AUTH_INVALID_CREDENTIALS: '이메일 또는 비밀번호가 일치하지 않습니다.',
  AUTH_TOKEN_EXPIRED: '로그인이 만료되었습니다. 다시 로그인해 주세요.',
  AUTH_TOKEN_INVALID: '인증 정보가 유효하지 않습니다. 다시 로그인해 주세요.',
  VALIDATION_ERROR: '입력값을 다시 확인해 주세요.',
}

export function getErrorMessage(error: unknown, fallback = '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'): string {
  if (error instanceof AxiosError) {
    if (!error.response) {
      return '네트워크 연결을 확인한 후 다시 시도해 주세요.'
    }
    const body = error.response.data as ApiErrorBody | undefined
    if (body?.code && ERROR_MESSAGES[body.code]) {
      return ERROR_MESSAGES[body.code]
    }
    if (body?.message) {
      return body.message
    }
  }
  return fallback
}
