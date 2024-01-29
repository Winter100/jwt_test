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
import { userTokenStore } from "@/app/_utill/store/userTokenStore";

export default function Hello() {
  const [message, setMessage] = useState("");
  const StoreAccessToken = userTokenStore((state) => state.accessToken);

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();

    if (!accessToken) {
      setMessage("로그인이 필요한 작업입니다.");
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
  }, [StoreAccessToken]);

  return (
    <div className={styles.container}>
      <p>{message}</p>
      {!StoreAccessToken && (
        <p>
          <Link href={"/signin"}>로그인</Link>
        </p>
      )}
    </div>
  );
}
