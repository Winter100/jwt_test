"use client";
import React, { useEffect } from "react";
import styles from "./mainNavBar.module.css";
import Link from "next/link";
import {
  clearAllTokensFromLocalStorage,
  getAccessTokenFromLocalStorage,
} from "@/app/_utill/helper";
import { userTokenStore } from "@/app/_utill/store/userTokenStore";

export default function MainNavBar() {
  const userStoreToken = userTokenStore((state) => state.accessToken);
  const userSetToken = userTokenStore((state) => state.setAccessToken);

  const setUserStokreAccessToken = userTokenStore(
    (state) => state.setAccessToken
  );

  const logoutHandler = () => {
    clearAllTokensFromLocalStorage();
    userSetToken("");
    // location.href = "/";
  };

  useEffect(() => {
    setUserStokreAccessToken(getAccessTokenFromLocalStorage() as string);
  }, [setUserStokreAccessToken]);

  return (
    <ul className={styles.container}>
      <li>
        <Link href={"/"}>HOME</Link>
      </li>

      {userStoreToken ? (
        <>
          <li>
            <Link href={"/hello"}>Hello</Link>
          </li>
          <li>
            <Link href={"/write"}>글쓰기</Link>
          </li>
        </>
      ) : (
        <li>
          <Link href={"/signup"}>회원가입</Link>
        </li>
      )}

      {!userStoreToken ? (
        <li>
          <Link href={"/signin"}>로그인</Link>
        </li>
      ) : (
        <li>
          <button onClick={logoutHandler}>로그아웃</button>
        </li>
      )}
    </ul>
  );
}
