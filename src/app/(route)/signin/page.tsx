"use client";
import Login from "@/app/_components/auth/signin/login";
import SocialLogin from "@/app/_components/auth/social/social";
import React from "react";

export default function LoginPage() {
  return (
    <div>
      <Login />
      <SocialLogin />
    </div>
  );
}
