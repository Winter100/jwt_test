"use client";
import React, { useState } from "react";
import styles from "./signup.module.css";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const idChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const passWordChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const nameChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const value = {
      id,
      password,
      name,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    };

    const response = await fetch("api", option);
    const data = await response.json();

    if (data) {
      router.push("/");
    } else {
      return;
    }
  };
  return (
    <form className={styles.container} onSubmit={onSubmitHandler}>
      <div>
        <label htmlFor="id">아이디</label>
        <input id="id" type="text " onChange={idChageHandler} />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" onChange={passWordChageHandler} />
      </div>
      <div>
        <label htmlFor="name">이름</label>
        <input id="name" type="text " onChange={nameChageHandler} />
      </div>
      <button>가입</button>
    </form>
  );
}
