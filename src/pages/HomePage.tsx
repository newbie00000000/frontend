import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  return (
    <div className="mx-auto mt-16 w-full max-w-sm text-center">
      {isAuthenticated ? (
        <p className="text-gray-700">{user?.nickname}님, 환영합니다!</p>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className="text-gray-700">로그인 후 서비스를 이용해 주세요.</p>
          <div className="flex gap-3">
            <Link to="/login" className="text-blue-600 hover:underline">
              로그인
            </Link>
            <Link to="/signup" className="text-blue-600 hover:underline">
              회원가입
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
