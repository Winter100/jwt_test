"use client";
import React, { FormEvent, useEffect, useState } from "react";
import styles from "./login.module.css";
import { requestApi } from "@/app/_utill/requestApi";
import {
  setAccessTokenFromLocalStorage,
  setReFreshTokenFromLocalStorage,
} from "@/app/_utill/helper";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  const idChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onsubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const value = {
        userId: id,
        password,
      };

      const options = {
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: value,
      };

      const response = await requestApi(options);

      if (response.code.includes("A00")) {
        setMessage(response.message);
        return;
      }

      if (response.accessToken) {
        setAccessTokenFromLocalStorage(response.accessToken);
        setReFreshTokenFromLocalStorage(response.refreshToken);
        setMessage("로그인 성공! 잠시후 이동합니다.");
        const timer = setTimeout(() => {
          location.href = "/";
        }, 2000);
        setTimerId(timer);
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
      </form>
      <p>{message}</p>
    </>
  );
}
