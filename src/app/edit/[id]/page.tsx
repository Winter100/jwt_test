import Write from "@/app/_components/write/write";
import React from "react";

export default async function EditPage() {
  return (
    <div>
      <Write method={"PATCH"} />
    </div>
  );
}

async function getEditPageData(id: string) {
  const response = await fetch("api");
  const data = await response.json();
  return data;
}
