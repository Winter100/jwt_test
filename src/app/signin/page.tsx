import React from "react";
import Login from "../_components/auth/signin/login";
import SocialLogin from "../_components/auth/social/social";

export default function LoginPage() {
  return (
    <div>
      <Login />
      <SocialLogin />
    </div>
  );
}
