"use client";
import React, { FormEvent, useState } from "react";
import styles from "./login.module.css";
import { requestAddress } from "@/app/_utill/httpAddress";

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
      console.log(requestAddress);

      const value = {
        userId: id,
        password,
      };

      const response = await fetch(`${requestAddress}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      console.log("t", data);

      // localStorage.setItem("Access-token", "액세스토큰");
      // localStorage.setItem("Refresh-token", "리프레쉬토큰");
      //로컬스토리지에 jwt 저장하기
    } catch (e) {
      console.log(e);
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
