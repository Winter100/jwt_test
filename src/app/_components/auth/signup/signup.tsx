"use client";
import React, { useState } from "react";
import styles from "./signup.module.css";
import { requestApi } from "@/app/_utill/requestApi";
import { DOES_NOT_USE_TOKEN } from "@/app/_utill/helper";
import { AxiosResponse } from "axios";

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setMessage("");
    setIsLoading(true);

    try {
      const value = {
        userId: id,
        password,
        email,
      };

      if (
        value.userId.trim().length < 1 ||
        value.password.trim().length < 1 ||
        value.email.trim().length < 1
      ) {
        setMessage("아이디, 비밀번호, 이메일을 입력해주세요");
        setIsLoading(false);
        return;
      }

      const options = {
        url: "signup",
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

      if (response?.status === 204) {
        alert("가입이 완료되었습니다.");
        location.href = "/";
      } else {
        setMessage(
          `Code: ${response.data?.code}, Message: ${response.data?.message}`
        );
        setIsLoading(false);
      }
      return;
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
        <button disabled={isLoading}>가입</button>
        <p>{message}</p>
      </form>
    </>
  );
}
