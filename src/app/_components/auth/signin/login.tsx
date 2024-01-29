"use client";
import React, { FormEvent, useState } from "react";

import { requestApi } from "@/app/_utill/requestApi";
import {
  DOES_NOT_USE_TOKEN,
  setAccessTokenFromLocalStorage,
  setReFreshTokenFromLocalStorage,
} from "@/app/_utill/helper";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { userTokenStore } from "@/app/_utill/store/userTokenStore";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import UnstyledInputIntroduction from "../../input/customInput";
import styles from "./login.module.css";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const setAccessToken = userTokenStore((state) => state.setAccessToken);
  const setRefreshToken = userTokenStore((state) => state.setRefreshToken);

  const onsubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setOpen(true);
    try {
      const value = {
        userId: id,
        password,
      };

      if (value.userId.trim().length < 1 || value.password.trim().length < 1) {
        setMessage("아이디, 비밀번호를 입력해주세요");
        setIsLoading(false);
        setOpen(false);
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
      setOpen(false);
    }
  };

  return (
    <>
      <form className={styles.container} onSubmit={onsubmitHandler}>
        <h2>로그인</h2>
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
        <Button type="submit" variant="contained" disabled={isLoading}>
          로그인
        </Button>
        {message}
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
