"use client";
import React, { FormEvent, useState } from "react";
import styles from "./login.module.css";
import { requestApi } from "@/app/_utill/requestApi";
import {
  DOES_NOT_USE_TOKEN,
  setAccessTokenFromLocalStorage,
  setReFreshTokenFromLocalStorage,
} from "@/app/_utill/helper";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { userTokenStore } from "@/app/_utill/store/userTokenStore";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const setAccessToken = userTokenStore((state) => state.setAccessToken);
  const setRefreshToken = userTokenStore((state) => state.setRefreshToken);

  const idChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onsubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const value = {
        userId: id,
        password,
      };

      if (value.userId.trim().length < 1 || value.password.trim().length < 1) {
        setMessage("아이디, 비밀번호를 입력해주세요");
        setIsLoading(false);
        return;
      }

      const options = {
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: value,
      };

      const response = (await requestApi(
        options,
        DOES_NOT_USE_TOKEN
      )) as AxiosResponse<any, any>;

      if (response.status === 200) {
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
        setMessage(
          `Code: ${response.data?.code} Message: ${response.data?.message}`
        );
        return;
      }
    } catch (e) {
      console.log("로그인의 에러", e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form className={styles.container} onSubmit={onsubmitHandler}>
        <div>
          <label htmlFor="id">아이디</label>
          <input id="id" type="text" onChange={idChangeHandler} value={id} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            onChange={passwordChangeHandler}
            value={password}
          />
        </div>
        <button disabled={isLoading}>로그인</button>
        <p>{message}</p>
      </form>
    </>
  );
}
