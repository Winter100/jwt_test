"use client";
// 카카오 로그인
export function useAuthKakao() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env}&redirect_uri=${process.env}&response_type=code`;
  return (window.location.href = kakaoURL);
}
// 구글 로그인
export function useAuthGoogle() {
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env}&response_type=token&redirect_uri=${process.env}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  return (window.location.href = googleURL);
}
// 네이버 로그인
export function useAuthNaver() {
  const naverState = "jwttest";
  const uri = encodeURIComponent(
    process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL as string
  );
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=${naverState}&redirect_uri=${uri}`;
  return (window.location.href = naverURL);
}
