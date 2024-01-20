"use client";
import React, { useState } from "react";
import styles from "./signup.module.css";
import { useRouter } from "next/navigation";
import { requestAddress } from "@/app/_utill/httpAddress";

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

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

    const value = {
      userId: id,
      password,
      email,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    };

    try {
      const response = await fetch(`${requestAddress}/signup`, option);
      const data = await response.json();

      console.log(data);

      // if (data) {
      //   router.push("/");
      // } else {
      //   return;
      // }
    } catch (e) {
      console.log(e);
    }
  };
  return (
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
  );
}
