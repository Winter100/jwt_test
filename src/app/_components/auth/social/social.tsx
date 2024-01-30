"use client";
import React from "react";
import styles from "./social.module.css";

import { useRouter } from "next/navigation";
import { useAuthNaver } from "@/app/_utill/socialAuth";
import axios from "axios";
import { requestAddress } from "@/app/_utill/httpAddress";

export default function SocialLogin() {
  const width = 150;
  const height = 40;

  const naverHandler = async () => {
    const response = await axios.get(
      `${requestAddress}/oauth2/authorization/naver`
    );
    console.log("response", response);

    const data = response.data;
    console.log("data", data);

    return;
  };

  return (
    <div className={styles.container}>
      <button onClick={naverHandler} className={styles.btn} id="naver">
        {/* <button onClick={useAuthNaver} className={styles.btn} id="naver"> */}
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
