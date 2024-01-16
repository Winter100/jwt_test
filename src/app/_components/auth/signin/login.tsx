"use client";
import React, { FormEvent, useState } from "react";
import styles from "./login.module.css";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const idChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onsubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const value = {
      id,
      password,
    };

    const response = await fetch("api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const data = await response.json();
    //로컬스토리지에 jwt 저장하기
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
      <button>로그인</button>
    </form>
  );
}
