"use client";
import React, { FormEvent, useState } from "react";
import styles from "./login.module.css";
import { requestAddress } from "@/app/_utill/httpAddress";
import { requestApi } from "@/app/_utill/requestApi";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      };

      const data = await requestApi("login", option);

      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        location.href = "/";
      }
    } catch (e) {
      console.log("로그인의 에러", e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
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
  );
}
