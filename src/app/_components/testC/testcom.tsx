"use client";

import { userTokenStore } from "@/app/_utill/store/userTokenStore";
import React from "react";

export default function Testcom() {
  return (
    <button onClick={() => console.log(userTokenStore.getState().accessToken)}>
      asdf
    </button>
  );
}
