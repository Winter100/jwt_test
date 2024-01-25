"use client";
import {
  getAccessTokenFromLocalStorage,
  USES_TOKEN,
} from "@/app/_utill/helper";

import { requestApi } from "@/app/_utill/requestApi";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import styles from "./hello.module.css";
import Link from "next/link";

export default function Hello() {
  const [message, setMessage] = useState("");
  const [isLoginBtn, setIsLoginBtn] = useState(false);

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();

    if (!accessToken) {
      setMessage("로그인이 필요한 작업입니다.");
      setIsLoginBtn(true);
      return;
    }

    async function getData() {
      try {
        const options = {
          url: "hello",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${accessToken}`,
          },
        };

        const response = (await requestApi(
          options,
          USES_TOKEN
        )) as AxiosResponse<any, any>;

        if (response?.status === 200) {
          setMessage(response?.data);
        } else {
          setMessage(response?.data);
        }
        return;
      } catch (e) {
        console.log(e);
        return;
      }
    }

    getData();
  }, []);

  return (
    <div className={styles.container}>
      <p>{message}</p>
      {isLoginBtn && (
        <p>
          <Link href={"/signin"}>로그인</Link>
        </p>
      )}
    </div>
  );
}
