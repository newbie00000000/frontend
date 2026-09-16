import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { logout as logoutRequest } from '../api/auth'

export function Navbar() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  async function handleLogout() {
    try {
      await logoutRequest()
    } finally {
      clearAuth()
      navigate('/login')
    }
  }

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <Link to="/" className="text-sm font-semibold text-gray-900">
        회원가입/로그인 서비스
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {isAuthenticated ? (
          <>
            <Link to="/mypage" className="text-gray-700 hover:underline">
              {user?.nickname}님
            </Link>
            <button onClick={handleLogout} className="text-gray-500 hover:text-gray-800">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:underline">
              로그인
            </Link>
            <Link to="/signup" className="text-gray-700 hover:underline">
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
