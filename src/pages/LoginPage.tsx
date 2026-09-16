import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TextField } from '../components/TextField'
import { Button } from '../components/Button'
import { AlertBanner } from '../components/AlertBanner'
import { login } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import { loginSchema, type LoginFormValues } from '../lib/validation'
import { getErrorMessage } from '../lib/errorMessage'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const signupSuccess = Boolean((location.state as { signupSuccess?: boolean } | null)?.signupSuccess)
  const setAuth = useAuthStore((state) => state.setAuth)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(values: LoginFormValues) {
    setServerError(null)
    try {
      const { data } = await login(values)
      setAuth(data.accessToken, data.user)
      navigate('/mypage')
    } catch (error) {
      setServerError(getErrorMessage(error))
    }
  }

  return (
    <div className="mx-auto mt-16 w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-lg font-bold text-gray-900">로그인</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        {signupSuccess && !serverError && (
          <div className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
            회원가입이 완료되었습니다. 로그인해 주세요.
          </div>
        )}
        {serverError && <AlertBanner message={serverError} />}

        <TextField
          label="이메일"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" isLoading={isSubmitting}>
          로그인
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        계정이 없으신가요?{' '}
        <Link to="/signup" className="font-medium text-blue-600 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  )
}
