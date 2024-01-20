"use client";
import { requestAddress } from "@/app/_utill/httpAddress";
import React from "react";

export default function Hello() {
  const onSubmitHandler = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      const response = await fetch(`${requestAddress}/hello`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return <button onClick={onSubmitHandler}>GET요청</button>;
}
