"use client";
import React from "react";
import { useAuthNaver } from "@/app/_utill/social";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
  const router = useRouter();

  const onClickHandler = () => {
    const naverState = "jwttest";
    const uri = encodeURIComponent(
      process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL as string
    );
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=${naverState}&redirect_uri=${uri}`;
    router.push(naverURL);
  };
  return (
    <div>
      <button onClick={onClickHandler}>네이버 온클릭버전</button>
      <button onClick={useAuthNaver}>네이버</button>
      <button
        onClick={() => console.log(process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL)}
      >
        url확인
      </button>
    </div>
  );
}
