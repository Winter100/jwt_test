"use client";
import React, { useEffect, useState } from "react";
import styles from "./mainNavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainNavBar() {
  const [accessToken, setAccessToken] = useState("");

  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    location.reload();
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken") as string;
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);
  return (
    <ul className={styles.container}>
      <li>
        <Link href={"/"}>HOME</Link>
      </li>
      {!accessToken ? (
        <li>
          <Link href={"/signin"}>로그인</Link>
        </li>
      ) : (
        <button onClick={logoutHandler}>로그아웃</button>
      )}
      <li>
        <Link href={"/signup"}>회원가입</Link>
      </li>
      <li>
        <Link href={"/write"}>글쓰기</Link>
      </li>
      {accessToken && (
        <li>
          <Link href={"/hello"}>Hello</Link>
        </li>
      )}
    </ul>
  );
}
