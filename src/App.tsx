import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { MyPage } from './pages/MyPage'
import { fetchMe } from './api/auth'
import { http } from './lib/http'
import { useAuthStore } from './store/authStore'
import type { RefreshResponse } from './types/auth'

function App() {
  const [isBootstrapping, setIsBootstrapping] = useState(true)
  const setAuth = useAuthStore((state) => state.setAuth)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  useEffect(() => {
    async function restoreSession() {
      try {
        const { data } = await http.post<RefreshResponse>('/api/auth/refresh')
        setAccessToken(data.accessToken)
        const { data: user } = await fetchMe()
        setAuth(data.accessToken, user)
      } catch {
        // Refresh Token이 없거나 만료된 경우: 로그아웃 상태 유지
      } finally {
        setIsBootstrapping(false)
      }
    }
    restoreSession()
  }, [setAuth, setAccessToken])

  if (isBootstrapping) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
