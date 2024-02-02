"use client";
import React from "react";
import styles from "./social.module.css";

import { useRouter } from "next/navigation";
import { requestAddress } from "@/app/_utill/httpAddress";
import { useSocialLoginName } from "@/app/_utill/store/socialNameStore";

export default function SocialLogin() {
  const width = 150;
  const height = 40;
  const router = useRouter();

  const setSocialName = useSocialLoginName((state) => state.setSocialLoginName);

  const socialLoginHandler = async (socialName: string) => {
    setSocialName(socialName);
    router.push(`${requestAddress}/oauth2/authorization/${socialName}`);
    return;
  };

  return (
    <div className={styles.container}>
      <button
        onClick={(e) => socialLoginHandler(e.currentTarget.id)}
        className={styles.btn}
        id="naver"
      >
        <img src="/naver.png" alt="네이버" width={width} height={height} />
      </button>
      <button
        onClick={(e) => socialLoginHandler(e.currentTarget.id)}
        className={styles.btn}
        id="kakao"
      >
        <img src="/kakao.png" alt="kakao" width={width} height={height} />
      </button>
      <button
        onClick={(e) => socialLoginHandler(e.currentTarget.id)}
        className={styles.btn}
        id="google"
      >
        <img src="/google.png" alt="google" width={width} height={height} />
      </button>
    </div>
  );
}
