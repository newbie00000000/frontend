import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export function Button({ isLoading, disabled, children, ...rest }: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      {...rest}
    >
      {isLoading ? '처리 중...' : children}
    </button>
  )
}
