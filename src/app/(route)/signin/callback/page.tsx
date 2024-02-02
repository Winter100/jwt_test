"use client";

import {
  setAccessTokenFromLocalStorage,
  setReFreshTokenFromLocalStorage,
} from "@/app/_utill/helper";
import { userTokenStore } from "@/app/_utill/store/userTokenStore";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import { requestAddress } from "@/app/_utill/httpAddress";
import { useSocialLoginName } from "@/app/_utill/store/socialNameStore";

export default function CallBackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setAccessToken = userTokenStore((state) => state.setAccessToken);
  const setRefreshToken = userTokenStore((state) => state.setRefreshToken);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const socialName = useSocialLoginName.getState().socialLoginName;

    if (!code || code.trim().length < 1 || !socialName) router.replace("/");

    const loginFetch = async () => {
      try {
        const response = await axios.get(
          `${requestAddress}/login/oauth2/code/${socialName}?code=${code}&state=${state}`,
          { withCredentials: true }
        );

        if (response?.status === 200) {
          if (response.data?.accessToken) {
            const accessToken = response.data?.accessToken;
            const refreshToken = response.data?.refreshToken;
            setAccessTokenFromLocalStorage(accessToken);
            setReFreshTokenFromLocalStorage(refreshToken);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
          }
          router.push("/");
          return;
        } else {
          router.push("/");
          return;
        }
      } catch (e) {
        router.push("/");
        return;
      }
    };

    loginFetch();
  }, [searchParams, router, setRefreshToken, setAccessToken]);
  return <div className={styles.container}>로그인 중....</div>;
}
