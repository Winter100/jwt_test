"use client";
import React from "react";
import Item from "./item";
import styles from "./itemList.module.css";
import Link from "next/link";

interface ItemListType {
  id: number;
  title: string;
  image: string;
}

export default function ItemList() {
  const DUMMY = [
    { id: 1, title: "제목1", image: "이미지" },
    { id: 2, title: "제목1", image: "이미지" },
    { id: 3, title: "제목1", image: "이미지" },
    { id: 4, title: "제목1", image: "이미지" },
    { id: 5, title: "제목1", image: "이미지" },
    { id: 6, title: "제목1", image: "이미지" },
    { id: 7, title: "제목1", image: "이미지" },
  ];

  function itemRender(itemList: ItemListType[]) {
    return itemList.map((item) => (
      <li key={item.id} className={styles.li}>
        <Link href={`/detail/${item.id}`}>
          <Item data={item} />
        </Link>
      </li>
    ));
  }

  return <div className={styles.container}>{itemRender(DUMMY)}</div>;
}
