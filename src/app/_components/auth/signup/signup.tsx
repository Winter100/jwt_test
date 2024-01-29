"use client";
import React, { useState } from "react";
import styles from "./signup.module.css";
import { requestApi } from "@/app/_utill/requestApi";
import { DOES_NOT_USE_TOKEN } from "@/app/_utill/helper";
import { AxiosResponse } from "axios";
import UnstyledInputIntroduction from "../../input/customInput";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    setOpen(true);

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
        setOpen(false);
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
        router.push("/");
      } else {
        setMessage(
          `Code: ${response.data?.code}, Message: ${response.data?.message}`
        );
        setIsLoading(false);
      }
      return;
    } catch (e) {
      console.log(e);
    } finally {
      setOpen(false);
    }
  };
  return (
    <>
      <form className={styles.container} onSubmit={onSubmitHandler}>
        <h2>회원가입</h2>
        <UnstyledInputIntroduction
          type={"text"}
          value={id}
          change={setId}
          text={"아이디"}
        />
        <UnstyledInputIntroduction
          type={"password"}
          value={password}
          change={setPassword}
          text={"비밀번호"}
        />
        <UnstyledInputIntroduction
          type={"email"}
          value={email}
          change={setEmail}
          text={"이메일"}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          회원가입
        </Button>
        <p>{message}</p>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
