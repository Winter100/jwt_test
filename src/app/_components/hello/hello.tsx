"use client";
import {
  getAccessTokenFromLocalStorage,
  getReFreshTokenFromLocalStorage,
  setAccessTokenFromLocalStorage,
  setReFreshTokenFromLocalStorage,
  usesToken,
} from "@/app/_utill/helper";
import { requestAddress } from "@/app/_utill/httpAddress";
import { requestApi } from "@/app/_utill/requestApi";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Hello() {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) return setData("로그인이 필요한 작업입니다.");

  //   async function getData() {
  //     const options = {
  //       url: "hello",
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `${accessToken}`,
  //       },
  //     };

  //     const data = await requestApi(options);

  //     // setData(data.message);
  //   }

  //   getData();
  // }, []);

  const onSubmitHandler = async () => {
    try {
      const accessToken = getAccessTokenFromLocalStorage();

      // if (!accessToken) return;

      const options = {
        url: "hello",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${accessToken}`,
        },
      };
      const response = await requestApi(options, usesToken);

      if (response?.code.includes("T0")) {
        setMessage(`Code: ${response.code}, Message: ${response.message}`);
      } else {
        setMessage(response.data);
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };

  const refresh = async () => {
    const refreshToken = getReFreshTokenFromLocalStorage() as string;

    try {
      // if (!refreshToken) return;

      console.log(refreshToken);

      const params = new URLSearchParams();
      params.append("refreshToken", refreshToken);

      // const params = {
      //   refreshToken: refreshToken,
      // };
      //1. const params = `refreshToken=${refreshToken}`;
      //2. const params = "refreshToken=" + encodeURIComponent(refreshToken);
      //3. URL에 /token?refreshToken=${refreshToken}

      const options = {
        url: "token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: params,
      };

      // const response = await requestApi(options);
      const axiosResponse = await axios.post(
        `${requestAddress}/token`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      const data = axiosResponse.data;
      // const data = axiosResponse.data;
      if (data.accessToken) {
        localStorage.clear();
        setAccessTokenFromLocalStorage(data.accessToken);
        setReFreshTokenFromLocalStorage(data.refreshToken);
      }
      console.log("성공");
      return;
    } catch (e) {
      console.log("axios테스트 에러:", e);
    }
  };
  return (
    <>
      <button onClick={onSubmitHandler}>GET요청</button>;
      <button onClick={refresh}>refresh</button>
      {message}
    </>
  );
}
