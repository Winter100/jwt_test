"use client";
import React, { useState } from "react";
import styles from "./write.module.css";

import UnstyledTextareaIntroduction from "../input/textArea";
import { Button } from "@mui/material";

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
      <UnstyledTextareaIntroduction minRows={3} />
      <UnstyledTextareaIntroduction minRows={35} />
      <Button type="submit" variant="contained" disabled={isLoading}>
        글쓰기
      </Button>
    </form>
  );
}
