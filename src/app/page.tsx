import ItemList from "./_components/item/itemList";

export default async function Home() {
  return (
    <div>
      <ItemList />
    </div>
  );
}

async function getDetailData() {
  const response = await fetch("http://43.201.188.14/orders");
}
