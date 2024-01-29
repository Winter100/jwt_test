"use client";
import React from "react";
import styles from "./social.module.css";

import { useRouter } from "next/navigation";
import { useAuthNaver } from "@/app/_utill/socialAuth";

export default function SocialLogin() {
  const width = 150;
  const height = 40;

  return (
    <div className={styles.container}>
      <button onClick={useAuthNaver} className={styles.btn} id="naver">
        {/* <Image src={"/naver.png"} alt="네이버" width={width} height={height} /> */}
        <img src="/naver.png" alt="네이버" width={width} height={height} />
      </button>
      {/* <button className={styles.btn} id="kakao">
        <Image src={"/kakao.png"} alt="카카오" width={width} height={height} />
        <img src="/kakao.png" alt="kakao" width={width} height={height} />
      </button>
      <button className={styles.btn} id="google">
        <Image src={"/google.png"} alt="google" width={width} height={height} />
        <img src="/google.png" alt="google" width={width} height={height} />
      </button> */}
    </div>
  );
}
