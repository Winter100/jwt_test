import DetailItem from "@/app/_components/detail/detail";
import React from "react";

export default async function DetailPage() {
  return (
    <div>
      <DetailItem />
    </div>
  );
}

async function getDetailData(id: string) {
  const response = await fetch("api");
  const data = await response.json();
  return data;
}
