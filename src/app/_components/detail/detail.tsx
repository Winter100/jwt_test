import React from "react";
import styles from "./detail.module.css";

export default function DetailItem() {
  return (
    <div className={styles.container}>
      <div>타이틀</div>
      <div>내용</div>
      <div>
        본인의 게시글 일때만 보임?
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
}
