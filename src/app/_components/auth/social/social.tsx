"use client";
import React from "react";
import styles from "./social.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
  const router = useRouter();

  const width = 150;
  const height = 40;

  const socialLoginHandler = () => {};
  return (
    <div className={styles.container}>
      <button className={styles.btn} id="naver" onClick={socialLoginHandler}>
        {/* <Image src={"/naver.png"} alt="네이버" width={width} height={height} /> */}
        <img src="/naver.png" alt="네이버" width={width} height={height} />
      </button>
      <button className={styles.btn} id="kakao" onClick={socialLoginHandler}>
        {/* <Image src={"/kakao.png"} alt="카카오" width={width} height={height} /> */}
        <img src="/kakao.png" alt="kakao" width={width} height={height} />
      </button>
      <button className={styles.btn} id="google" onClick={socialLoginHandler}>
        {/* <Image src={"/google.png"} alt="google" width={width} height={height} /> */}
        <img src="/google.png" alt="google" width={width} height={height} />
      </button>
    </div>
  );
}
