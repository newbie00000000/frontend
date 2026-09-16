import { z } from 'zod'

const email = z.string().min(1, '이메일을 입력해 주세요.').email('올바른 이메일 형식이 아닙니다.')

const password = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .regex(/[a-zA-Z]/, '비밀번호에 영문을 포함해 주세요.')
  .regex(/[0-9]/, '비밀번호에 숫자를 포함해 주세요.')
  .regex(/[^a-zA-Z0-9]/, '비밀번호에 특수문자를 포함해 주세요.')

const nickname = z
  .string()
  .min(2, '닉네임은 2자 이상이어야 합니다.')
  .max(12, '닉네임은 12자 이하여야 합니다.')
  .regex(/^[가-힣a-zA-Z0-9]+$/, '닉네임에 특수문자는 사용할 수 없습니다.')

export const signupSchema = z
  .object({
    email,
    password,
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해 주세요.'),
    nickname,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })

export type SignupFormValues = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email,
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
