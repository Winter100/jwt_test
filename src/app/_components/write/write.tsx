"use client";
import React, { useState } from "react";
import styles from "./write.module.css";

interface WriteType {
  method: string;
}

export default function Write({ method }: WriteType) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const contentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const writeHanlder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(method);
  };

  return (
    <form className={styles.container} onSubmit={writeHanlder}>
      <div className={styles.title_container}>
        <label>제목</label>
        <input type="text" onChange={titleChangeHandler} value={title} />
      </div>
      <div className={styles.textarea_container}>
        <textarea onChange={contentChangeHandler} value={content} />
      </div>
      <button disabled={isLoading}>글쓰기</button>
    </form>
  );
}
