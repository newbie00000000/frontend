import { useAuthStore } from '../store/authStore'

export function MyPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="mx-auto mt-16 w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-lg font-bold text-gray-900">마이페이지</h1>
      <dl className="flex flex-col gap-3 text-sm">
        <div>
          <dt className="text-gray-500">이메일</dt>
          <dd className="font-medium text-gray-900">{user?.email}</dd>
        </div>
        <div>
          <dt className="text-gray-500">닉네임</dt>
          <dd className="font-medium text-gray-900">{user?.nickname}</dd>
        </div>
      </dl>
    </div>
  )
}
