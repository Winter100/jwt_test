import React from "react";
import styles from "./item.module.css";
import book from "../../../../public/dummy_book.jpg";
import Image from "next/image";

export default function Item({
  data,
}: {
  data: { image: string; title: string };
}) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image className={styles.imageTag} src={book} alt="제목" fill />
      </div>
      <div className={styles.title}>{data.title}</div>
    </div>
  );
}
