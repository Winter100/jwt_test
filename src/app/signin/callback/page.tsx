"use client";

import { DOES_NOT_USE_TOKEN } from "@/app/_utill/helper";
import { requestApi } from "@/app/_utill/requestApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function CallBackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    console.log(searchParams.get("code"));
    const code = searchParams.get("code");

    if (!code || code.trim().length < 1) router.replace("/");

    const loginFetch = async () => {
      const option = {
        method: "POST",
        url: "naver",
      };
      const response = await requestApi(option, DOES_NOT_USE_TOKEN);
    };

    // loginFetch()
  }, [searchParams, router]);
  return <div>로그인 중....</div>;
}
