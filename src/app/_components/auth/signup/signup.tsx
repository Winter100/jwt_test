"use client";
import React, { useState } from "react";
import styles from "./signup.module.css";
import { requestApi } from "@/app/_utill/requestApi";

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const idChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const passWordChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const nameChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const value = {
        userId: id,
        password,
        email,
      };

      const options = {
        url: "signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: value,
      };

      const data = await requestApi(options);

      if (data.code === "G001") {
        setMessage(data.message);
        return;
      }
      alert("가입이 완료되었습니다.");
      location.href = "/";
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <form className={styles.container} onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="id">아이디</label>
          <input id="id" type="text " onChange={idChageHandler} value={id} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            onChange={passWordChageHandler}
            value={password}
          />
        </div>
        <div>
          <label htmlFor="name">이메일</label>
          <input
            id="name"
            type="email"
            onChange={nameChageHandler}
            value={email}
          />
        </div>
        <button>가입</button>
      </form>
      <p>{message}</p>
    </>
  );
}
