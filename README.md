# frontend

회원가입/로그인 서비스 프론트엔드. 기획 내용은 [기획서.md](./기획서.md) 참고.

## 스택
React + TypeScript + Vite, Tailwind CSS, React Router, Zustand, Axios, React Hook Form + Zod

## 시작하기
```bash
npm install
cp .env.example .env   # VITE_API_BASE_URL을 백엔드 주소로 설정
npm run dev
```

## 폴더 구조
```
src/
  api/        # 백엔드 API 호출 함수
  components/ # 공용 UI 컴포넌트
  lib/        # axios 인스턴스, 유효성 검사 스키마, 에러 메시지 매핑
  pages/      # 라우트별 페이지 (홈/로그인/회원가입/마이페이지)
  store/      # 인증 상태 (Zustand)
  types/      # 공용 타입
```

## 인증 흐름
- Access Token은 Zustand 스토어(메모리)에만 보관합니다.
- Refresh Token은 백엔드가 HttpOnly Cookie로 내려주는 것을 전제로 하며, axios는 `withCredentials: true`로 요청합니다.
- 앱 최초 로드 시 `/api/auth/refresh`를 호출해 세션 복원을 시도합니다.
- API 응답이 401이면 자동으로 토큰 재발급을 시도한 뒤 원래 요청을 재시도합니다.

백엔드가 아직 없다면 로그인/회원가입 시 네트워크 오류 메시지가 표시되는 것이 정상입니다. `backend` 폴더의 기획서에 정의된 API가 준비되면 정상 동작합니다.
