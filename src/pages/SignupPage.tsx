import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { TextField } from '../components/TextField'
import { Button } from '../components/Button'
import { AlertBanner } from '../components/AlertBanner'
import { signup } from '../api/auth'
import { signupSchema, type SignupFormValues } from '../lib/validation'
import { getErrorMessage } from '../lib/errorMessage'

export function SignupPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) })

  async function onSubmit(values: SignupFormValues) {
    setServerError(null)
    try {
      await signup(values)
      navigate('/login', { state: { signupSuccess: true } })
    } catch (error) {
      setServerError(getErrorMessage(error))
    }
  }

  return (
    <div className="mx-auto mt-16 w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-lg font-bold text-gray-900">회원가입</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        {serverError && <AlertBanner message={serverError} />}

        <TextField
          label="이메일"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="닉네임"
          type="text"
          autoComplete="nickname"
          error={errors.nickname?.message}
          {...register('nickname')}
        />
        <TextField
          label="비밀번호"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          autoComplete="new-password"
          error={errors.passwordConfirm?.message}
          {...register('passwordConfirm')}
        />

        <Button type="submit" isLoading={isSubmitting}>
          가입하기
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          로그인
        </Link>
      </p>
    </div>
  )
}
