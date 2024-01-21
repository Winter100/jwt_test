"use client";
import { requestAddress } from "@/app/_utill/httpAddress";
import { requestApi } from "@/app/_utill/requestApi";
import axios from "axios";
import React from "react";

export default function Hello() {
  const onSubmitHandler = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return;

      const option = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${accessToken}`,
        },
      };

      const data = await requestApi("hello", option);
    } catch (e) {
      console.log(e);
    }
  };

  const refresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken") as string;

    try {
      if (!requestAddress) return;

      const params = new URLSearchParams();
      params.append("refreshToken", refreshToken);

      // const params = {
      //   refreshToken: refreshToken,
      // };

      // const params = `refreshToken=${refreshToken}`;
      // const params = "refreshToken=" + encodeURIComponent(refreshToken);

      const axiosResponse = await axios.post(
        requestAddress,
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      console.log("axiosResponse", axiosResponse);
      // console.log("refreshToken=" + encodeURIComponent(refreshToken));

      if (refreshToken) {
        // const formData = new FormData();
        // const params = new URLSearchParams();
        // params.append("refreshToken", refreshToken);
        //   const refreshRequestOption = {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        //     },
        //     body: `refreshToken=${refreshToken}`,
        //   };
        //   const newTokenData = await requestApi("token", refreshRequestOption);
        //   console.log("newTokenData", newTokenData);
        //   console.log("끝");
        //   return;
        //   // console.log("newTokenData", newTokenData);
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <button onClick={onSubmitHandler}>GET요청</button>;
      <button onClick={refresh}>refresh</button>
    </>
  );
}
