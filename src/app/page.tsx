import ItemList from "./_components/item/itemList";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className={styles.container}>
      <ItemList />
    </div>
  );
}
