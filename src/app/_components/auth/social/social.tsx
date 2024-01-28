"use client";
import React from "react";
import { useAuthNaver } from "@/app/_utill/social";
import Image from "next/image";
import naver from "../../../../../public/btnnaver.jpg";

export default function SocialLogin() {
  return (
    <div>
      <button onClick={useAuthNaver}></button>
      <Image src={naver} width={200} height={150} alt="네이버 로그인" />
    </div>
  );
}
