"use client";
import React from "react";
import styles from "./mainNavBar.module.css";
import Link from "next/link";

export default function MainNavBar() {
  return (
    <ul className={styles.container}>
      <li>
        <Link href={"/"}>HOME</Link>
      </li>
      <li>
        <Link href={"/signin"}>로그인</Link>
      </li>
      <li>
        <Link href={"/signup"}>회원가입</Link>
      </li>
      <li>
        <Link href={"/write"}>글쓰기</Link>
      </li>
    </ul>
  );
}
