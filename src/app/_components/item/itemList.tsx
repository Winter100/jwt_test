"use client";
import React, { useState } from "react";
import Item from "./item";
import styles from "./itemList.module.css";
import Link from "next/link";

interface ItemListType {
  id: number;
  title: string;
  image: string;
}

export default function ItemList() {
  const DUMMY = { id: Math.random(), title: "제목1", image: "이미지" };
  const [dummy, setDummy] = useState([DUMMY]);

  const onClickHandler = () => {
    const newItem = {
      id: Math.random(),
      title: "새로운 제목",
      image: "새로운 이미지",
    };
    setDummy((pre) => [...pre, newItem]);
  };

  function itemRender(itemList: ItemListType[]) {
    return (
      <ul>
        {itemList.map((item) => (
          <li key={item.id} className={styles.li}>
            <Link href={`/detail/${item.id}`}>
              <Item data={item} />
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className={styles.container}>{itemRender(dummy)}</div>
      <button onClick={onClickHandler}>추가</button>
    </>
  );
}
