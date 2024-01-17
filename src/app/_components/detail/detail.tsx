import React from "react";
import styles from "./detail.module.css";

export default function DetailItem() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>타이틀</p>
      </div>
      <div className={styles.content}>
        <p>내용</p>
      </div>
      <div className={styles.btn}>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
}
